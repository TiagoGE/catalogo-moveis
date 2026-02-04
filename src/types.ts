export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Product{
    id: number;
    name: string;
    description: string;
    category_id: number;
    photo: string[];
}