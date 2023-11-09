import type { PageServerLoad } from './$types';
import { SlugFromPath } from '$lib/slugFromPath';

export const load: PageServerLoad = async ({ url }) => {
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

	return { posts: await Promise.all(postPromises) };
};
