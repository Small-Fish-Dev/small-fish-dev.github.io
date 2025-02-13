const API_ENDPOINT: string = 'https://services.facepunch.com/sbox';
const NEWS_API: string = 'news/organization/fish';

interface BackendUser {
	Id: bigint;
	Name: string;
	Url: string;
}

interface NewsSection {
	Id: string;
	Title: string;
	Author: BackendUser;
	SortOrder: number;
	Contents: string;
	Slug: string;
}

interface NewsPost {
	Id: string;
	Url: string;
	Created: string;
	Title: string;
	Summary: string;
	Author: BackendUser;
	Media: string;
	Sections: NewsSection[];
	Package: string;
}

export type NewsEntry = {
	url: string;
	date: Date;
	title: string;
	summary: string;
	thumbnail: string;
	package: string | undefined;
	source: string;
};

export const BlogAsNews = function (blog: App.BlogPost): NewsEntry {
	return {
		url: `${location.origin}/blog/${blog.slug}`,
		thumbnail: `/blogs/${blog.slug}/${blog.thumbnail}`,
		date: new Date(blog.date),
		title: blog.title,
		summary: blog.description,
		source: 'Fishblog'
	} as NewsEntry;
};

export const NewsAsNews = function (news: NewsPost): NewsEntry {
	return {
		url: `https://sbox.game${news.Url}`,
		thumbnail: news.Media,
		date: new Date(news.Created),
		title: news.Title,
		summary: news.Summary,
		package: news.Package.substring(5).replaceAll('_', ' '),
		source: 'sbox.game'
	} as NewsEntry;
};

export const FetchNewsAsync = async function (): Promise<NewsPost[] | null> {
	const response = await fetch(`${API_ENDPOINT}/${NEWS_API}`);

	// We failed our request...
	if (!response.ok) return null;

	// Get the body.
	const body = await response.text();
	if (body == null) return null;

	const posts: NewsPost[] = JSON.parse(body);
	return posts;
};
