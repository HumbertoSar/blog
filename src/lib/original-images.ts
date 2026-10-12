import fs from 'node:fs';
import path from 'node:path';

const BLOG_ROOT = path.join(process.cwd(), 'src/content/blog');
const PUBLIC_ROOT = path.join(process.cwd(), 'public/originais');

const LOCAL_ASSET = /\.(?:png|jpe?g|gif|webp|avif)$/i;

/**
 * Public URL for a markdown image's source file.
 * `./img/shot.png` next to a post becomes `/originais/<post>/img/shot.png`.
 * Remote and site-absolute URLs are left alone.
 */
export function originalImagePublicHref(markdownFile: string, imageSrc: string): string | undefined {
	if (!imageSrc || /^(?:[a-z][a-z0-9+.-]*:|\/)/i.test(imageSrc)) return undefined;

	let decoded = imageSrc;
	try {
		decoded = decodeURI(imageSrc);
	} catch {
		return undefined;
	}

	const absolute = path.resolve(path.dirname(path.resolve(markdownFile)), decoded);
	const relativeToBlog = path.relative(BLOG_ROOT, absolute);
	if (relativeToBlog.startsWith('..') || path.isAbsolute(relativeToBlog)) return undefined;
	if (!relativeToBlog.split(path.sep).includes('img')) return undefined;

	return `/originais/${relativeToBlog.split(path.sep).join('/')}`;
}

/** Copy one source image into `public/originais` and return its public href. */
export function publishOriginalImage(markdownFile: string, imageSrc: string): string | undefined {
	const href = originalImagePublicHref(markdownFile, imageSrc);
	if (!href) return undefined;

	const absolute = path.resolve(path.dirname(path.resolve(markdownFile)), decodeURI(imageSrc));
	if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) return undefined;

	const dest = path.join(process.cwd(), 'public', href.slice(1));
	fs.mkdirSync(path.dirname(dest), { recursive: true });
	fs.copyFileSync(absolute, dest);
	return href;
}

/** Copy every blog `img/` asset so original files exist even when markdown is cached. */
export function publishAllBlogOriginals(): void {
	if (!fs.existsSync(BLOG_ROOT)) return;
	walk(BLOG_ROOT);
}

function walk(dir: string): void {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(full);
			continue;
		}
		if (!entry.isFile() || !LOCAL_ASSET.test(entry.name)) continue;
		const relative = path.relative(BLOG_ROOT, full);
		if (!relative.split(path.sep).includes('img')) continue;
		const dest = path.join(PUBLIC_ROOT, relative);
		fs.mkdirSync(path.dirname(dest), { recursive: true });
		fs.copyFileSync(full, dest);
	}
}
