import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/types/Product";
import { useFavoritesStore } from "@/store/useFavoriteStore";
import ButtonFavorite from "./ButtonFavorite";
import CarrouselImage from "./CarrouselImage";
import ButtonDetalhes from "./ButtonDetalhes";

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
            <CarrouselImage product={product} />
            <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>R$ {product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardFooter>
                <ButtonFavorite favorite={favorite} handleFavorite={handleFavorite}/>
                <ButtonDetalhes id={product.id} />
            </CardFooter>
        </Card>
        </>
    );
}