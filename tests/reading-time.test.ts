import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readingTimeMinutes } from '../src/lib/reading-time.ts';

describe('readingTimeMinutes', () => {
	it('rounds 400 words to 2 minutes at 200 wpm', () => {
		const markdown = Array.from({ length: 400 }, () => 'palavra').join(' ');
		assert.equal(readingTimeMinutes(markdown), 2);
	});

	it('stays at one minute for a short note', () => {
		assert.equal(readingTimeMinutes('Uma frase curta.'), 1);
	});

	it('ignores HTML comments and frontmatter', () => {
		const hidden = Array.from({ length: 800 }, () => 'oculto').join(' ');
		const markdown = `---\ntitle: Teste\n---\n<!-- ${hidden} -->\n\nTexto visível.`;
		assert.equal(readingTimeMinutes(markdown), 1);
	});
});
