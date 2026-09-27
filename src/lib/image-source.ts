export type ImageCandidate = {
	url: string;
	width: number;
};

/** Parse an HTML srcset into URL + pixel-width candidates. */
export function parseSrcset(srcset: string, baseWidth = 0): ImageCandidate[] {
	const candidates: ImageCandidate[] = [];
	for (const part of srcset.split(',')) {
		const tokens = part.trim().split(/\s+/).filter(Boolean);
		if (tokens.length === 0) continue;
		const url = tokens[0];
		const descriptor = tokens[1] ?? '';
		let width = 0;
		if (descriptor.endsWith('w')) width = Number.parseInt(descriptor, 10);
		else if (descriptor.endsWith('x')) width = Number.parseFloat(descriptor) * baseWidth;
		candidates.push({ url, width: Number.isFinite(width) ? width : 0 });
	}
	return candidates;
}

/**
 * Highest-resolution URL among astro:assets candidates.
 * Prefers the largest `w`/`x` descriptor, then a wider `src`, then the last candidate.
 */
export function largestImageUrl(candidates: ImageCandidate[]): string | undefined {
	const usable = candidates.filter((candidate) => candidate.url);
	if (usable.length === 0) return undefined;
	const withWidth = usable.filter((candidate) => candidate.width > 0);
	if (withWidth.length === 0) return usable[usable.length - 1].url;
	return withWidth.reduce((best, candidate) => (candidate.width > best.width ? candidate : best)).url;
}
