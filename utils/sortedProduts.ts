import { Product } from "@/types/Product";

export function sortPriceAsc(a: Product, b: Product){
    return a.price - b.price;
}

export function sortPriceDesc(a: Product, b: Product){
    return b.price - a.price;
}

export function sortNameAsc(a: Product, b: Product){
    return a.title.localeCompare(b.title);
}

export function sortNameDesc(a: Product, b: Product){
    return b.title.localeCompare(a.title);
}