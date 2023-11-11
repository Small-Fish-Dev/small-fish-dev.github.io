import type { EntryGenerator } from './$types';
import { slugFromPath } from '$lib/utils/SlugFromPath';

// https://kit.svelte.dev/docs/page-options#prerender-troubleshooting
export const entries: EntryGenerator = async () => {
	const modules = import.meta.glob(`/src/blogs/*.{md,svx,svelte.md}`);
	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as App.MdsvexFile).metadata
				}) as App.BlogPost
		)
	);

	const posts = await Promise.all(postPromises);
	return posts;
};
export const prerender = true;
