import type { EntryGenerator } from './$types';
import { SlugFromPath } from '$lib/slugFromPath';

export const entries: EntryGenerator = async () => {
	const modules = import.meta.glob(`/src/blogs/*.{md,svx,svelte.md}`);
	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: SlugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				}) as App.BlogPost
		)
	);

	const posts = await Promise.all(postPromises);
	return posts;
};
export const prerender = true;
