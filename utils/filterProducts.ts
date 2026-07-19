import { Product } from "@/types/Product";

export function matchesSearch(product: Product, searchTerm: string){
    const term = searchTerm.toLowerCase();

    return (
        product.title.toLowerCase().includes(term)
    );
}

export function matchesCategory(product: Product, categories: string[]){
    return categories.length > 0 ? categories.includes(product.category) : true;
}