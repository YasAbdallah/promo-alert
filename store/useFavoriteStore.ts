import { create } from "zustand";
import { Product } from "@/types/Product";


type FavoritesStore = {
    favorites: Product[],
    addFavorite: (product: Product) => void,
    removeFavorite: (id: number) => void,
    isFavorite: (id: number) => boolean,
}


export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    favorites: [],

    addFavorite: (product: Product) => set((state) => ({
        favorites: [...state.favorites, product],
    })),

    removeFavorite: (id: number) => set((state) => ({
        favorites: state.favorites.filter((item) => item.id !== id),
    })),

    isFavorite: (id: number) => {
        return get().favorites.some((item) => item.id === id)
    },
}));