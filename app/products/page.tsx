"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/Product";
import LoadingCard from "@/components/product/LoadingCard";
import SearchInput from "@/components/search/SearchInput";
import CategoryFilter from "@/components/search/CategoryFilter";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase();

        return (
            product.title.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );
    });

    const categories = Array.from(new Set(products.map((p) => p.category)));
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    }

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
                    <CategoryFilter 
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
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