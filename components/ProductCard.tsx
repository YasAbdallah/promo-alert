import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Product } from "@/types/Product";
import { useFavoritesStore } from "@/store/useFavoriteStore";
import ButtonFavorite from "./ButtonFavorite";
import CarrouselImage from "./CarrouselImage";
import Link from "next/link";

type Props = {
    product: Product,
}

export default function ProductCard({product}: Props) {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
    const favorite = isFavorite(product.id);
    const handleFavorite = () => {
        if(favorite){
            removeFavorite(product.id);
        }else{
            addFavorite(product);
        }
    };
    return (
        <>
            <Card className="relative mx-auto w-full max-w-sm pt-0">
                <Link href={`/products/${product.id}`} className="block hover:opacity-90 transition cursor-pointer">
                    <CarrouselImage product={product} />
                    <CardHeader>
                        <CardTitle>{product.title}</CardTitle>
                        <CardDescription>{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL",})}</CardDescription>
                    </CardHeader>
                </Link>
                <CardFooter className="flex gap-2">
                    <ButtonFavorite favorite={favorite} handleFavorite={handleFavorite}/>
                </CardFooter>
            </Card>
        </>
    );
}