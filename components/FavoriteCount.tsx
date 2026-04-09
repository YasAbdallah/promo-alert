import { useFavoritesStore } from "@/store/useFavoriteStore";
import { Badge } from "@/components/ui/badge";

export default function FavoriteCount() {

    const favoritesCount = useFavoritesStore((state) => state.favorites.length);
    
    return (
        <div className="flex w-full flex-wrap justify-end gap-2">
            <Badge>Total Favoritado: {favoritesCount}</Badge>
        </div>
    );
}