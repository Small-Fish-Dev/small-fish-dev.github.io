import type { EntryGenerator } from './$types';

function slugFromPath(path: string) {
	return path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;
}

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
