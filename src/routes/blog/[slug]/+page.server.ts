import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
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

	const posts = await Promise.all(postPromises);
	return posts;
};
export const prerender = true;
