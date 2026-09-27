import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { largestImageUrl, parseSrcset } from '../src/lib/image-source.ts';

describe('largestImageUrl', () => {
	it('uses the only optimized src when there is no srcset', () => {
		assert.equal(
			largestImageUrl([{ url: '/_astro/shot.webp', width: 1536 }]),
			'/_astro/shot.webp',
		);
	});

	it('picks the largest srcset candidate instead of the thumbnail src', () => {
		const srcset =
			'/_astro/shot-640.webp 640w, /_astro/shot-1280.webp 1280w, /_astro/shot-1600.webp 1600w';
		const candidates = [
			...parseSrcset(srcset, 800),
			{ url: '/_astro/shot-800.webp', width: 800 },
		];
		assert.equal(largestImageUrl(candidates), '/_astro/shot-1600.webp');
	});

	it('keeps the original-size src when it is wider than every srcset candidate', () => {
		const candidates = [
			...parseSrcset('/_astro/shot-640.webp 640w, /_astro/shot-960.webp 960w'),
			{ url: '/_astro/shot-full.webp', width: 1536 },
		];
		assert.equal(largestImageUrl(candidates), '/_astro/shot-full.webp');
	});

	it('resolves density descriptors against the image width', () => {
		const candidates = parseSrcset('/_astro/shot.webp 1x, /_astro/shot-2x.webp 2x', 800);
		assert.equal(largestImageUrl(candidates), '/_astro/shot-2x.webp');
	});

	it('falls back to the last candidate when widths are missing', () => {
		assert.equal(
			largestImageUrl([
				{ url: '/_astro/a.webp', width: 0 },
				{ url: '/_astro/b.webp', width: 0 },
			]),
			'/_astro/b.webp',
		);
	});
});
