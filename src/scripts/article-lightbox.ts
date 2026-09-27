import { largestImageUrl, parseSrcset, type ImageCandidate } from '../lib/image-source';

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
	leftover.querySelectorAll('img, em, button.article-zoom').forEach((node) => node.remove());
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
	if (!stage || !captionEl || !closeBtn) return;

	const zoomImg = doc.createElement('img');
	zoomImg.className = 'article-lightbox__img';
	zoomImg.alt = '';
	zoomImg.decoding = 'async';
	stage.insertBefore(zoomImg, captionEl);

	let returnFocus: HTMLElement | null = null;

	const unlock = () => {
		doc.documentElement.classList.remove('article-lightbox-open');
	};

	dialog.addEventListener('close', () => {
		unlock();
		zoomImg.removeAttribute('src');
		for (const trigger of prose.querySelectorAll<HTMLButtonElement>('.article-zoom[aria-expanded="true"]')) {
			trigger.setAttribute('aria-expanded', 'false');
		}
		returnFocus?.focus();
		returnFocus = null;
	});

	dialog.addEventListener('click', (event) => {
		if (event.target === dialog) dialog.close();
	});

	closeBtn.addEventListener('click', () => {
		dialog.close();
	});

	const open = (source: HTMLImageElement, trigger: HTMLButtonElement) => {
		const chosen = largestImageUrl(candidatesFor(source));
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

		returnFocus = trigger;
		trigger.setAttribute('aria-expanded', 'true');
		doc.documentElement.classList.add('article-lightbox-open');
		if (!dialog.open) dialog.showModal();
		closeBtn.focus();
	};

	for (const img of prose.querySelectorAll('img')) {
		if (img.closest('a') || img.closest('.article-zoom')) continue;
		const button = doc.createElement('button');
		button.type = 'button';
		button.className = 'article-zoom';
		button.setAttribute('aria-haspopup', 'dialog');
		button.setAttribute('aria-controls', 'article-lightbox');
		button.setAttribute('aria-expanded', 'false');
		const alt = img.getAttribute('alt')?.trim() ?? '';
		button.setAttribute('aria-label', alt ? `Ampliar imagem: ${alt}` : 'Ampliar imagem');
		img.parentNode?.insertBefore(button, img);
		button.append(img);
		button.addEventListener('click', () => open(img, button));
	}
}
