"use client";

import { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getProducts } from "@/services/productService";
import SearchInput from "@/components/search/SearchInput";
import OrderFilter from "@/components/filter/OrderFilter";
import ProductCard from "@/components/product/ProductCard";
import LoadingCard from "@/components/product/LoadingCard";
import CategoryFilter from "@/components/filter/CategoryFilter";
import CleanFiltersButton from "@/components/filter/CleanFiltersButton";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        const categoriesFromURL = searchParams.getAll("category");
        const matchCategory = categoriesFromURL.length > 0 ? categoriesFromURL.includes(product.category)
            : true;

        return (
            (product.title.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term)) &&
            matchCategory
        );
    });

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
                    <OrderFilter 
                        productPrices={[...new Set(products.map(product => product.price))]}
                        productTitle={[...new Set(products.map(product => product.title))]}
                    />
                    <Separator orientation="horizontal" className="mt-3 mb-3"/>
                    <CategoryFilter
                        categories={[...new Set(products.map(p => p.category))]}
                    />
                </aside>

                {/* PRODUTOS */}
                <div className="flex-1 grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </section>
        </section>
    );
}