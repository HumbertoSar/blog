const WORDS_PER_MINUTE = 200;

/**
 * Minutes to read a markdown article, ignoring frontmatter, HTML comments,
 * fenced code, and image markup. At least 1.
 */
export function readingTimeMinutes(markdown: string, wordsPerMinute = WORDS_PER_MINUTE): number {
	const withoutFrontmatter = markdown.replace(/^---[\s\S]*?---\s*/, '');
	const text = withoutFrontmatter
		.replace(/<!--[\s\S]*?-->/g, ' ')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
		.replace(/[#>*_~`|]/g, ' ');
	const words = text.split(/\s+/).filter((word) => word.length > 0);
	return Math.max(1, Math.round(words.length / wordsPerMinute));
}
