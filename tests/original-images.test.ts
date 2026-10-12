import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { originalImagePublicHref } from '../src/lib/original-images.ts';

const post = 'src/content/blog/fontes-em-ia-quase-ninguem-confere/index.md';

describe('originalImagePublicHref', () => {
	it('maps a post image to the public originals path', () => {
		assert.equal(
			originalImagePublicHref(post, './img/q2-01-anotado.png'),
			'/originais/fontes-em-ia-quase-ninguem-confere/img/q2-01-anotado.png',
		);
	});

	it('keeps nested mockup paths', () => {
		assert.equal(
			originalImagePublicHref(post, './img/mockups/01-fonte-no-trecho.png'),
			'/originais/fontes-em-ia-quase-ninguem-confere/img/mockups/01-fonte-no-trecho.png',
		);
	});

	it('does not rewrite remote or site-absolute images', () => {
		assert.equal(originalImagePublicHref(post, 'https://example.com/shot.png'), undefined);
		assert.equal(originalImagePublicHref(post, '/og-default.png'), undefined);
	});

	it('rejects paths that leave the blog content tree', () => {
		assert.equal(originalImagePublicHref(post, '../../secrets.png'), undefined);
	});
});
