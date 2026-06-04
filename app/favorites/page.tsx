"use client";

import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { useFavoritesStore } from "@/store/useFavoriteStore";

export default function FavoritesPage() {
    const favorites = useFavoritesStore((state) => state.favorites);
    const removeAllFavorites = useFavoritesStore(
        (state) => state.removeAllFavorites
    );

    // 📭 Empty state
    if (favorites.length === 0) {
        return (
            <section className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-xl font-semibold mb-2">
                    Nenhum favorito encontrado
                </h2>
                <p className="text-muted-foreground mb-4">
                    Adicione produtos aos favoritos para acompanhar promoções.
                </p>
                <Button variant="outline" onClick={() => (window.location.href = "/products")}>
                    Ver produtos
                </Button>
            </section>
        );
    }

    return (
        <section className="container mx-auto py-8 px-4">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold">
                        Meus Favoritos
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {favorites.length} produto(s) salvo(s)
                    </p>
                </div>

                <Button
                    onClick={removeAllFavorites}
                    variant="destructive"
                    className="w-full md:w-auto"
                >
                    Remover todos
                </Button>
            </div>

            {/* Grid de produtos */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {favorites.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

        </section>
    );
}