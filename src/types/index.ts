// types.ts
export interface Category {
    id: string | number;
    name: string;
}

export interface Product {
    id: string | number;
    name: string;
    description: string;
    sale_price_virtual_store: number;
    is_composition: boolean;
    images: string[] | null;
    categories: Category[] | null;
    components?: Array<{
        id: string | number;
        name: string;
        quantity: number;
    }>;
}