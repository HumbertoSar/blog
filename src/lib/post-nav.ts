export type PostNavEntry = {
	id: string;
	title: string;
	pubDate: Date;
};

export type PostNeighbors<T extends PostNavEntry> = {
	newer?: T;
	older?: T;
};

/** Newer and older posts around `currentId`. Newest first; id breaks date ties. */
export function neighboringPosts<T extends PostNavEntry>(posts: T[], currentId: string): PostNeighbors<T> {
	const sorted = [...posts].sort((a, b) => {
		const byDate = b.pubDate.valueOf() - a.pubDate.valueOf();
		if (byDate !== 0) return byDate;
		return a.id.localeCompare(b.id);
	});
	const index = sorted.findIndex((post) => post.id === currentId);
	if (index === -1) return {};
	return {
		newer: sorted[index - 1],
		older: sorted[index + 1],
	};
}
