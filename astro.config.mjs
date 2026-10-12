// @ts-check

import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { publishAllBlogOriginals } from './src/lib/original-images.ts';
import { originalImageLinksPlugin } from './src/plugins/original-image-links.ts';

publishAllBlogOriginals();

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.mvpsardenberg.cloud',
	integrations: [mdx(), sitemap()],
	markdown: {
		processor: satteri({
			hastPlugins: [originalImageLinksPlugin()],
		}),
	},
	i18n: {
		defaultLocale: 'pt-BR',
		locales: ['pt-BR'],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
