const API_ENDPOINT: string = "https://services.facepunch.com/sbox";
const NEWS_API: string = "news/organization/fish";

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

export interface NewsPost {
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

export const FetchNewsAsync = async function (): Promise<NewsPost[] | null> {
    const response = await fetch(`${API_ENDPOINT}/${NEWS_API}`);

    // We failed our request...
    if(!response.ok)
        return null;

    // Get the body.
    const body = await response.text();
    if(body == null)
        return null;
    
    const posts: NewsPost[] = JSON.parse(body);
    return posts;
}