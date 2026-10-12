import { parseSrcset, preferredZoomUrl, type ImageCandidate } from '../lib/image-source';
import { shouldZoomOnClick } from '../lib/zoom-click';

function resolveUrl(url: string): string {
	try {
		return new URL(url, document.baseURI).href;
	} catch {
		return url;
	}
}

function candidatesFor(img: HTMLImageElement): ImageCandidate[] {
	const width = Number(img.getAttribute('width')) || 0;
	const candidates: ImageCandidate[] = [];
	const picture = img.closest('picture');
	if (picture) {
		for (const source of picture.querySelectorAll('source')) {
			const srcset = source.getAttribute('srcset');
			if (srcset) candidates.push(...parseSrcset(srcset, width));
		}
	}
	const srcset = img.getAttribute('srcset');
	if (srcset) candidates.push(...parseSrcset(srcset, width));
	const src = img.getAttribute('src');
	if (src) candidates.push({ url: src, width });
	return candidates;
}

function captionFor(img: HTMLImageElement): string {
	const paragraph = img.closest('p');
	if (!paragraph) return '';
	const em = [...paragraph.children].find((el) => el.tagName === 'EM');
	if (!em) return '';
	const leftover = paragraph.cloneNode(true) as HTMLElement;
	leftover.querySelectorAll('img, em, button.article-zoom, a.figure-original').forEach((node) => node.remove());
	if (leftover.textContent?.trim()) return '';
	return em.textContent?.trim() ?? '';
}

export function initArticleLightbox(doc: Document = document): void {
	const dialog = doc.querySelector<HTMLDialogElement>('dialog.article-lightbox');
	const prose = doc.querySelector('main article .prose');
	if (!dialog || !prose || dialog.dataset.ready === 'true') return;
	dialog.dataset.ready = 'true';

	const stage = dialog.querySelector('.article-lightbox__stage');
	const captionEl = dialog.querySelector<HTMLElement>('.article-lightbox__caption');
	const closeBtn = dialog.querySelector<HTMLButtonElement>('.article-lightbox__close');
	const originalLink = dialog.querySelector<HTMLAnchorElement>('a.article-lightbox__original');
	if (!stage || !captionEl || !closeBtn) return;

	const zoomImg = doc.createElement('img');
	zoomImg.className = 'article-lightbox__img';
	zoomImg.alt = '';
	zoomImg.decoding = 'async';
	stage.insertBefore(zoomImg, captionEl);

	let returnFocus: HTMLElement | null = null;
	let lockedScrollY = 0;
	// Enter activates the image button on keydown, then keyup lands on the
	// close button and would dismiss the dialog in the same gesture.
	let swallowKeyboardClose = false;

	const lockScroll = () => {
		lockedScrollY = window.scrollY;
		const body = doc.body;
		body.style.position = 'fixed';
		body.style.top = `-${lockedScrollY}px`;
		body.style.left = '0';
		body.style.right = '0';
		body.style.width = '100%';
		doc.documentElement.classList.add('article-lightbox-open');
	};

	const unlockScroll = () => {
		const body = doc.body;
		body.style.position = '';
		body.style.top = '';
		body.style.left = '';
		body.style.right = '';
		body.style.width = '';
		doc.documentElement.classList.remove('article-lightbox-open');
		window.scrollTo(0, lockedScrollY);
	};

	dialog.addEventListener('close', () => {
		unlockScroll();
		swallowKeyboardClose = false;
		zoomImg.removeAttribute('src');
		if (originalLink) {
			originalLink.hidden = true;
			originalLink.removeAttribute('href');
		}
		for (const trigger of prose.querySelectorAll<HTMLElement>('.article-zoom[aria-expanded="true"]')) {
			trigger.setAttribute('aria-expanded', 'false');
		}
		returnFocus?.focus();
		returnFocus = null;
	});

	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) dialog.close();
	});

	closeBtn.addEventListener('keydown', (event) => {
		if (!event.repeat) swallowKeyboardClose = false;
	});

	closeBtn.addEventListener('click', (event) => {
		if (swallowKeyboardClose && event.detail === 0) {
			swallowKeyboardClose = false;
			return;
		}
		dialog.close();
	});

	const open = (source: HTMLImageElement, trigger: HTMLElement) => {
		const originalHref = source.closest('a.figure-original')?.getAttribute('href');
		const chosen = preferredZoomUrl(originalHref, candidatesFor(source));
		if (!chosen) return;
		const alt = source.getAttribute('alt') ?? '';
		const caption = captionFor(source);
		const width = source.getAttribute('width');
		const height = source.getAttribute('height');

		zoomImg.src = resolveUrl(chosen);
		zoomImg.alt = alt;
		zoomImg.removeAttribute('srcset');
		zoomImg.removeAttribute('sizes');
		if (width && height) {
			zoomImg.width = Number(width);
			zoomImg.height = Number(height);
			zoomImg.style.aspectRatio = `${width} / ${height}`;
		}

		if (caption) {
			captionEl.textContent = caption;
			captionEl.hidden = false;
			dialog.classList.add('has-caption');
		} else {
			captionEl.textContent = '';
			captionEl.hidden = true;
			dialog.classList.remove('has-caption');
		}
		dialog.setAttribute('aria-label', caption || alt || 'Imagem ampliada');

		if (originalLink) {
			if (originalHref) {
				originalLink.href = resolveUrl(originalHref);
				originalLink.hidden = false;
			} else {
				originalLink.hidden = true;
				originalLink.removeAttribute('href');
			}
		}

		returnFocus = trigger;
		trigger.setAttribute('aria-expanded', 'true');
		lockScroll();
		if (!dialog.open) dialog.showModal();
		closeBtn.focus();
		swallowKeyboardClose = true;
	};

	const markZoomTrigger = (trigger: HTMLElement, img: HTMLImageElement) => {
		trigger.classList.add('article-zoom');
		trigger.setAttribute('aria-haspopup', 'dialog');
		trigger.setAttribute('aria-controls', 'article-lightbox');
		trigger.setAttribute('aria-expanded', 'false');
		if (!trigger.hasAttribute('aria-label')) {
			const alt = img.getAttribute('alt')?.trim() ?? '';
			if (trigger.tagName === 'BUTTON') {
				trigger.setAttribute('aria-label', alt ? `Ampliar imagem: ${alt}` : 'Ampliar imagem');
			}
		}
	};

	for (const img of prose.querySelectorAll('img')) {
		if (img.closest('.article-zoom')) continue;
		const link = img.closest('a');
		if (link) {
			if (!link.classList.contains('figure-original')) continue;
			markZoomTrigger(link, img);
			link.addEventListener('click', (event) => {
				if (!shouldZoomOnClick(event)) return;
				event.preventDefault();
				open(img, link);
			});
			continue;
		}
		const button = doc.createElement('button');
		button.type = 'button';
		button.className = 'article-zoom';
		markZoomTrigger(button, img);
		img.parentNode?.insertBefore(button, img);
		button.append(img);
		button.addEventListener('click', () => open(img, button));
	}
}
