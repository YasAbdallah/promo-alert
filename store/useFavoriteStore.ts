import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/types/Product";


type FavoritesStore = {
    favorites: Product[],
    addFavorite: (product: Product) => void,
    removeFavorite: (id: number) => void,
    removeAllFavorites: () => void,
    isFavorite: (id: number) => boolean,
}


export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            favorites: [],

            addFavorite: (product: Product) => set((state: FavoritesStore) => {
                const exist = state.favorites.some((item) => item.id === product.id);
                if(exist) return state;
                return {favorites: [...state.favorites, product]}
            }),

            removeFavorite: (id: number) => set((state: FavoritesStore) => ({
                favorites: state.favorites.filter((item) => item.id !== id),
            })),

            removeAllFavorites: () => set(() => ({
                favorites: [],
            })),

            isFavorite: (id: number) => {
                return get().favorites.some((item) => item.id === id)
            },
        }),
        { 
            name: "app:favorites",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({favorites: state.favorites}),

        }
    )
);