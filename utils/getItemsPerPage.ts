import { Product } from "@/types/Product";

export function getItemsPerPage(items: Product[], page: number, itemsPerPage: number) {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
}