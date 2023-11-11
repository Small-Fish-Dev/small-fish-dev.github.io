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

	const posts = await Promise.all(postPromises);
	posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: posts };
};
