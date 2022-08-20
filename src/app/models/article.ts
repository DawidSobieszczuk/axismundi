export interface Article {
    id: number;
    title: string;
    thumbnail: string;
    excerpt: string;
    content: string;
    is_draft: boolean;
    categories: string[];
    tags: string[];
}