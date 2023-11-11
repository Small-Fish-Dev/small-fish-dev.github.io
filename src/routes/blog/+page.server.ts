import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const modules = import.meta.glob(`/src/blogs/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null,
					...(post as unknown as App.MdsvexFile).metadata
				}) as App.BlogPost
		)
	);

	const posts = (await Promise.all(postPromises)).filter((p) => p.published);
	posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: posts };
};
