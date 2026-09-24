type Person = {
	'@type': 'Person';
	name: 'Humberto Sardenberg';
};

const author: Person = {
	'@type': 'Person',
	name: 'Humberto Sardenberg',
};

export type WebsiteJsonLd = {
	'@context': 'https://schema.org';
	'@type': 'WebSite';
	name: string;
	description: string;
	url: string;
	inLanguage: 'pt-BR';
	author: Person;
};

export type BlogPostingJsonLd = {
	'@context': 'https://schema.org';
	'@type': 'BlogPosting';
	headline: string;
	description: string;
	inLanguage: 'pt-BR';
	datePublished: string;
	dateModified?: string;
	url: string;
	mainEntityOfPage: string;
	author: Person;
	image?: string;
};

export type BreadcrumbListJsonLd = {
	'@context': 'https://schema.org';
	'@type': 'BreadcrumbList';
	itemListElement: Array<{
		'@type': 'ListItem';
		position: number;
		name: string;
		item: string;
	}>;
};

export function websiteJsonLd(input: {
	name: string;
	description: string;
	url: string;
}): WebsiteJsonLd {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: input.name,
		description: input.description,
		url: input.url,
		inLanguage: 'pt-BR',
		author,
	};
}

export function blogPostingJsonLd(input: {
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: Date;
	pageUrl: string;
	imageUrl?: string;
}): BlogPostingJsonLd {
	const data: BlogPostingJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: input.title,
		description: input.description,
		inLanguage: 'pt-BR',
		datePublished: input.pubDate.toISOString(),
		url: input.pageUrl,
		mainEntityOfPage: input.pageUrl,
		author,
	};

	if (input.updatedDate) {
		data.dateModified = input.updatedDate.toISOString();
	}
	if (input.imageUrl) {
		data.image = input.imageUrl;
	}

	return data;
}

export function breadcrumbListJsonLd(input: {
	title: string;
	pageUrl: string;
}): BreadcrumbListJsonLd {
	const origin = new URL(input.pageUrl).origin;

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Início',
				item: new URL('/', origin).href,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Blog',
				item: new URL('/blog/', origin).href,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: input.title,
				item: input.pageUrl,
			},
		],
	};
}

export function serializeJsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
