import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const dist = new URL('../dist/', import.meta.url);

function readDist(relativePath) {
	const file = new URL(relativePath, dist);
	assert.equal(existsSync(file), true, `${relativePath} should exist`);
	return readFileSync(file, 'utf8');
}

function walk(dir) {
	const files = [];
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) files.push(...walk(path));
		else files.push(path);
	}
	return files;
}

function jsonLd(html) {
	return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
		(match) => JSON.parse(match[1]),
	);
}

test('dist/404.html is a Portuguese not-found page in navy and cream, without GitHub', () => {
	const html = readDist('404.html');
	assert.match(html, /página não encontrada/i);
	assert.match(html, /href="\/"/);
	assert.match(html, /href="\/blog"/);
	assert.match(html, /href="\/agentes"/);
	assert.match(html, /href="\/sobre"/);
	assert.match(html, /Início/);
	assert.match(html, /Para agentes/);
	assert.match(html, /Sobre/);
	assert.doesNotMatch(html, /github/i);

	const cssHrefs = [...html.matchAll(/href="([^"]+\.css)"/g)].map((match) => match[1]);
	assert.ok(cssHrefs.length > 0, '404 should load the site stylesheet');
	const css = cssHrefs.map((href) => readFileSync(new URL(href.replace(/^\//, ''), dist), 'utf8')).join('\n');
	const branded = `${html}\n${css}`;
	assert.match(branded, /#0f2744/i);
	assert.match(branded, /#f7f5f0/i);
});

test('home publishes WebSite JSON-LD and og:type website', () => {
	const html = readDist('index.html');
	assert.match(html, /property="og:type" content="website"/);
	assert.doesNotMatch(html, /article:published_time/);

	const blocks = jsonLd(html);
	const website = blocks.find((block) => block['@type'] === 'WebSite');
	assert.ok(website);
	assert.equal(website.inLanguage, 'pt-BR');
	assert.equal(website.name, 'Humberto Sardenberg');
	assert.equal(website.author.name, 'Humberto Sardenberg');
	assert.equal(
		blocks.some((block) => block['@type'] === 'BlogPosting'),
		false,
	);
});

test('blog posts publish article metadata, BlogPosting, and breadcrumbs', () => {
	const html = readDist('blog/ola/index.html');
	assert.match(html, /property="og:type" content="article"/);
	assert.match(html, /property="article:published_time" content="2026-09-24T/);

	const blocks = jsonLd(html);
	const posting = blocks.find((block) => block['@type'] === 'BlogPosting');
	const crumbs = blocks.find((block) => block['@type'] === 'BreadcrumbList');
	assert.ok(posting);
	assert.equal(posting.headline, 'Olá');
	assert.equal(posting.inLanguage, 'pt-BR');
	assert.equal(posting.author.name, 'Humberto Sardenberg');
	assert.equal(posting.datePublished.startsWith('2026-09-24'), true);
	assert.equal('image' in posting, false);
	assert.ok(crumbs);
	assert.deepEqual(
		crumbs.itemListElement.map((item) => item.name),
		['Início', 'Blog', 'Olá'],
	);
	assert.equal(JSON.stringify(blocks).toLowerCase().includes('github'), false);
});

test('the about page is not marked up as a blog post', () => {
	const html = readDist('sobre/index.html');
	const blocks = jsonLd(html);
	assert.equal(
		blocks.some((block) => block['@type'] === 'BlogPosting' || block['@type'] === 'BreadcrumbList'),
		false,
	);
});

test('listing pages stay og:type website', () => {
	for (const page of ['blog/index.html', 'agentes/index.html']) {
		const html = readDist(page);
		assert.match(html, /property="og:type" content="website"/);
		assert.doesNotMatch(html, /article:published_time/);
	}
});

test('every content image has an alt attribute and no invented og image', () => {
	const htmlFiles = walk(dist.pathname).filter((file) => file.endsWith('.html'));
	assert.ok(htmlFiles.length > 0);

	for (const file of htmlFiles) {
		const html = readFileSync(file, 'utf8');
		for (const img of html.match(/<img\b[^>]*>/gi) ?? []) {
			assert.match(img, /\balt="/, `${file} has an image without alt`);
		}
		if (!html.includes('property="og:image"')) {
			assert.doesNotMatch(html, /property="og:image"/);
		}
	}

	const home = readDist('index.html');
	const post = readDist('blog/ola/index.html');
	assert.doesNotMatch(home, /property="og:image"/);
	assert.doesNotMatch(post, /property="og:image"/);
});
