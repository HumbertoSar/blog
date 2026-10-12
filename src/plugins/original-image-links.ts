import { fileURLToPath } from 'node:url';
import { publishOriginalImage } from '../lib/original-images.ts';

type ImgNode = {
	type: string;
	tagName?: string;
	properties?: Record<string, unknown>;
};

type VisitContext = {
	fileURL?: URL;
	parent: (node: ImgNode) => ImgNode | undefined;
	wrapNode: (node: ImgNode, wrapper: { raw: string }) => void;
};

/** Wrap local blog images in a link to the copied full-size source file. */
export function originalImageLinksPlugin() {
	return {
		name: 'original-image-links',
		element: {
			filter: ['img'],
			visit(node: ImgNode, ctx: VisitContext) {
				const rawSrc = node.properties?.src;
				if (typeof rawSrc !== 'string' || !ctx.fileURL) return;

				const parent = ctx.parent(node);
				if (parent?.tagName === 'a') return;

				const href = publishOriginalImage(fileURLToPath(ctx.fileURL), rawSrc);
				if (!href) return;

				ctx.wrapNode(node, {
					raw: `<a class="figure-original" href="${href}"></a>`,
				});
			},
		},
	};
}
