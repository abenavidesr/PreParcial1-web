export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnail: string;
    stock: number;
    description?: string;
    quantityCart?: number;
}