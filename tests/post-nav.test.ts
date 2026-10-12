import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { neighboringPosts } from '../src/lib/post-nav.ts';

const posts = [
	{ id: 'ola', title: 'Olá', pubDate: new Date('2026-09-24') },
	{ id: 'human-in-the-loop-sem-design-de-interacao', title: 'HITL', pubDate: new Date('2026-09-24') },
	{ id: 'fontes-em-ia-quase-ninguem-confere', title: 'Fontes', pubDate: new Date('2026-09-28') },
	{ id: 'backchannel-interfaces-de-ia', title: 'Backchannel', pubDate: new Date('2026-10-07') },
];

describe('neighboringPosts', () => {
	it('puts the newer post before and the older post after a middle article', () => {
		const { newer, older } = neighboringPosts(posts, 'fontes-em-ia-quase-ninguem-confere');
		assert.equal(newer?.id, 'backchannel-interfaces-de-ia');
		assert.equal(older?.id, 'human-in-the-loop-sem-design-de-interacao');
	});

	it('breaks same-day ties by id so the ends of the list have one neighbor', () => {
		const newest = neighboringPosts(posts, 'backchannel-interfaces-de-ia');
		assert.equal(newest.newer, undefined);
		assert.equal(newest.older?.id, 'fontes-em-ia-quase-ninguem-confere');

		const oldest = neighboringPosts(posts, 'ola');
		assert.equal(oldest.newer?.id, 'human-in-the-loop-sem-design-de-interacao');
		assert.equal(oldest.older, undefined);
	});
});
