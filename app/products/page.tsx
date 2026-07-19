"use client";

import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getProducts } from "@/services/productService";
import SortFilter from "@/components/filter/SortFilter";
import SearchInput from "@/components/search/SearchInput";
import { getItemsPerPage } from "@/utils/getItemsPerPage";
import ProductCard from "@/components/product/ProductCard";
import LoadingCard from "@/components/product/LoadingCard";
import CategoryFilter from "@/components/filter/CategoryFilter";
import { matchesCategory, matchesSearch } from "@/utils/filterProducts";
import CleanFiltersButton from "@/components/filter/CleanFiltersButton";
import { PaginationComponent } from "@/components/pagination/PaginationComponent";
import { sortNameAsc, sortNameDesc, sortPriceAsc, sortPriceDesc } from "@/utils/sortedProduts";
import { ChipsFilter } from "@/components/filter/ChipsFilter";
import { createChips } from "@/utils/createChips";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);''
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const categoriesFromURL = searchParams.getAll("category");
    const searchSortedParams = searchParams.get("sort");
    
    const filterProducts = products.filter(product => {
        return matchesSearch(product, searchTerm) &&
        matchesCategory(product, categoriesFromURL);
    });
    
    const filteredProductsWithSorting = [...filterProducts].sort((a, b) => {
        if(searchSortedParams === "price-asc") return sortPriceAsc(a, b);
        if(searchSortedParams === "price-desc") return sortPriceDesc(a, b);
        if(searchSortedParams === "name-asc") return sortNameAsc(a, b);
        if(searchSortedParams === "name-desc") return sortNameDesc(a, b);
        return 0;
    });

    const getProductsPerPage = getItemsPerPage(filteredProductsWithSorting, Number(searchParams.get("page") || "1"), 10);
    const chips = createChips(searchParams.toString());

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Loading state estilizado
    if (loading) {
        return (
            <section className="container mx-auto py-8 px-4">
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <LoadingCard key={index} />
                    ))}
                </div>
            </section>
        );
    }

    // Error state
    if (error) {
        return (
            <section className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-semibold">
                    Erro ao carregar produtos
                </p>
                <p className="text-muted-foreground">
                    Tente novamente mais tarde.
                </p>
            </section>
        );
    }

    // Empty state
    if (products.length === 0) {
        return (
            <section className="flex items-center justify-center py-20">
                <p className="text-muted-foreground">
                    Nenhum produto encontrado.
                </p>
            </section>
        );
    }

    return (
        <section className="container mx-auto py-8 px-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="grid grid-flow-col w-full justify-items-start-safe">
                    {(chips.length > 0) ? 
                        chips.map((chip, index) => (
                            <ChipsFilter key={index} label={chip} onRemove={() => {}} />
                        )) : null}
                </div>

                <div className="grid grid-flow-col w-full justify-items-end-safe">
                    <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

            </div>

            {/* Grid de produtos */}
            <section className="flex flex-col md:flex-row gap-6">

                {/* SIDEBAR */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">Categorias</h2>
                        <p className="text-sm text-muted-foreground">
                            Filtre os produtos
                        </p>
                    </div>

                    <CleanFiltersButton path={pathname} />
                    <Separator orientation="horizontal" className="mt-3 mb-3"/>
                    <SortFilter />
                    <Separator orientation="horizontal" className="mt-3 mb-3"/>
                    <CategoryFilter
                        categories={[...new Set(products.map(p => p.category))]}
                    />
                </aside>

                {/* PRODUTOS */}
                <div className="flex-1 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        getProductsPerPage.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    }
                </div>
            </section>
            <PaginationComponent 
                qntItemsPerPage={10} 
                totalItems={filteredProductsWithSorting.length} 
                currentPage={Number(searchParams.get("page") || "1")}
                searchParams={searchParams} 
            />
        </section>
    );
}