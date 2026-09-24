import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
	blogPostingJsonLd,
	breadcrumbListJsonLd,
	serializeJsonLd,
	websiteJsonLd,
} from '../src/lib/structured-data.ts';

const site = 'https://blog.mvpsardenberg.cloud';

describe('websiteJsonLd', () => {
	it('describes the site in pt-BR and names Humberto Sardenberg', () => {
		const data = websiteJsonLd({
			name: 'Humberto Sardenberg',
			description: 'Blog sobre produto de IA, HITL (human-in-the-loop) e interaction design.',
			url: `${site}/`,
		});

		assert.equal(data['@context'], 'https://schema.org');
		assert.equal(data['@type'], 'WebSite');
		assert.equal(data.name, 'Humberto Sardenberg');
		assert.equal(data.description, 'Blog sobre produto de IA, HITL (human-in-the-loop) e interaction design.');
		assert.equal(data.url, `${site}/`);
		assert.equal(data.inLanguage, 'pt-BR');
		assert.deepEqual(data.author, {
			'@type': 'Person',
			name: 'Humberto Sardenberg',
		});
		assert.equal(JSON.stringify(data).toLowerCase().includes('github'), false);
	});
});

describe('blogPostingJsonLd', () => {
	it('publishes only facts taken from the post', () => {
		const data = blogPostingJsonLd({
			title: 'Olá',
			description: 'Este blog está entrando no ar — produto de IA, HITL e interaction design.',
			pubDate: new Date('2026-09-24T00:00:00.000Z'),
			pageUrl: `${site}/blog/ola/`,
		});

		assert.equal(data['@context'], 'https://schema.org');
		assert.equal(data['@type'], 'BlogPosting');
		assert.equal(data.headline, 'Olá');
		assert.equal(data.description, 'Este blog está entrando no ar — produto de IA, HITL e interaction design.');
		assert.equal(data.inLanguage, 'pt-BR');
		assert.equal(data.datePublished, '2026-09-24T00:00:00.000Z');
		assert.equal(data.url, `${site}/blog/ola/`);
		assert.equal(data.mainEntityOfPage, `${site}/blog/ola/`);
		assert.deepEqual(data.author, {
			'@type': 'Person',
			name: 'Humberto Sardenberg',
		});
		assert.equal('dateModified' in data, false);
		assert.equal('image' in data, false);
		assert.equal(JSON.stringify(data).toLowerCase().includes('github'), false);
	});

	it('adds dateModified and image only when those facts exist', () => {
		const data = blogPostingJsonLd({
			title: 'Com imagem',
			description: 'Descrição real.',
			pubDate: new Date('2026-09-24T00:00:00.000Z'),
			updatedDate: new Date('2026-09-25T12:00:00.000Z'),
			pageUrl: `${site}/blog/com-imagem/`,
			imageUrl: `${site}/_astro/hero.png`,
		});

		assert.equal(data.dateModified, '2026-09-25T12:00:00.000Z');
		assert.equal(data.image, `${site}/_astro/hero.png`);
	});
});

describe('breadcrumbListJsonLd', () => {
	it('lists Início, Blog, and the post', () => {
		const data = breadcrumbListJsonLd({
			title: 'Olá',
			pageUrl: `${site}/blog/ola/`,
		});

		assert.equal(data['@context'], 'https://schema.org');
		assert.equal(data['@type'], 'BreadcrumbList');
		assert.deepEqual(
			data.itemListElement.map((item) => ({
				position: item.position,
				name: item.name,
				item: item.item,
			})),
			[
				{ position: 1, name: 'Início', item: `${site}/` },
				{ position: 2, name: 'Blog', item: `${site}/blog/` },
				{ position: 3, name: 'Olá', item: `${site}/blog/ola/` },
			],
		);
	});
});

describe('serializeJsonLd', () => {
	it('escapes angle brackets so the payload can sit in a script tag', () => {
		const serialized = serializeJsonLd({ headline: 'a < b' });
		assert.equal(serialized.includes('<'), false);
		assert.deepEqual(JSON.parse(serialized), { headline: 'a < b' });
	});
});
