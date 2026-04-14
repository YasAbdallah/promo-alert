"use client";

import { useFavoritesStore } from "@/store/useFavoriteStore";

export default function FavoriteCount() {

    const favoritesCount = useFavoritesStore((state) => state.favorites.length);
    
    return (
        <div className="relative flex items-center justify-center">
            <span className="absolute -right-3 -top-4 flex h-5 min-w-[15px] items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white animate-in fade-in zoom-in">{favoritesCount}</span>
        </div>
    );
}