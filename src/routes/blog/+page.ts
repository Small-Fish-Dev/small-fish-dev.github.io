import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const posts: App.BlogPost[] = await response.json();
	return { posts };
};
