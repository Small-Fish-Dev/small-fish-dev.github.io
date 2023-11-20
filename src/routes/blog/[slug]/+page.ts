import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { slugFromPath } from '$lib/utils/SlugFromPath';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob(`/src/blogs/*.{md,svx,svelte.md}`);

	let blogPost: App.MdsvexFile | undefined;
	let nextBlogPost: App.BlogPost | undefined;

	const moduleEntries = Object.entries(modules);
	for (let i = 0; i < moduleEntries.length; ++i) {
		const [path, resolver] = moduleEntries[i];

		if (slugFromPath(path) === params.slug) {
			// We found the main blog post we are going to be rendering.
			const match = { path, resolver: resolver as unknown as App.MdsvexResolver };
			blogPost = await match?.resolver?.();

			const postPromises = Object.entries(modules).map(([path, resolver]) =>
				resolver().then(
					(post) =>
						({
							slug: slugFromPath(path),
							...(post as unknown as App.MdsvexFile).metadata
						}) as App.BlogPost
				)
			);

			// We search for a blog post that is older than this current post.
			const posts = (await Promise.all(postPromises)).filter((p) => p.published);
			posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
			const blogPostIndex = posts.findIndex((p) => p.title === blogPost?.metadata.title);
			if (blogPostIndex !== -1 && blogPostIndex !== posts.length - 1)
				nextBlogPost = posts[blogPostIndex + 1];
			break;
		}
	}

	if (!blogPost) throw error(404);

	return {
		component: blogPost.default,
		frontmatter: blogPost.metadata,
		nextfrontmatter: nextBlogPost
	};
};
