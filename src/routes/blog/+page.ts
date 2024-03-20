import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch(`/api/posts`);
	const posts: App.BlogPost[] = (await response.json())
		.filter( (post: App.BlogPost) => post.published ?? true );
	return { posts };
};
