"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/Product";
import LoadingCard from "@/components/product/LoadingCard";
import SearchInput from "@/components/search/SearchInput";

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

                <h1 className="text-2xl font-bold">
                    Produtos
                </h1>

                <div className="w-full md:w-80">
                    <SearchInput
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>

            </div>

            {/* Grid de produtos */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}