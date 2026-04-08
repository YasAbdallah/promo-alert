import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/types/Product";
import { useFavoritesStore } from "@/store/useFavoriteStore";

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
            <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>R$ {product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={handleFavorite}>
                    {favorite ? "Remover dos favoritos" : "Favoritar"}
                </Button>
            </CardFooter>
        </Card>
        </>
    );
}