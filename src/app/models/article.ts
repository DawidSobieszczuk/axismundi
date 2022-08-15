export interface Article {
    id: string;
    title: string;
    thumbnail: string;
    excerpt: string;
    content: string;
    is_draft: boolean;
    categories: string[];
    tags: string[];
}