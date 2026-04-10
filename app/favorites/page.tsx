'use client'


import ProductCard from "@/components/ProductCard";
import ProductListLayout from "@/components/ProductLayout";
import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "@/store/useFavoriteStore";


export default function FavoritesPage() {
    const favorites = useFavoritesStore((state) => state.favorites);
    const removeAllFavorites = useFavoritesStore((state) => state.removeAllFavorites);

    if(favorites.length === 0) {
        return (
            <ProductListLayout title="Favoritos">
                <p>Nehum favorito encontrado.</p>
            </ProductListLayout>
        );
    }
    return (
        <>
            <section className="flex items-center m-4">
                <Button onClick={removeAllFavorites} variant="destructive">
                    Remover Todos
                </Button>
            </section>
            <ProductListLayout title="Favoritos">
                {favorites.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ProductListLayout>
        </>
    );
}