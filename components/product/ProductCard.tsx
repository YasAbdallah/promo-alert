import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/Product";
import { useFavoritesStore } from "@/store/useFavoriteStore";
import ButtonFavorite from "@/components/shared/ButtonFavorite";
import CarrouselImage from "@/components/product/CarrouselImage";
import Link from "next/link";

type Props = {
    product: Product,
}

export default function ProductCard({ product }: Props) {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
    const favorite = isFavorite(product.id);
    const handleFavorite = () => {
        if (favorite) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };
    return (
        <Card className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-xl border bg-background transition hover:shadow-lg">

            {/* Link principal */}
            <Link
                href={`/products/${product.id}`}
                className="block cursor-pointer"
            >
                {/* Imagem */}
                <CarrouselImage product={product} />

                {/* Conteúdo */}
                <CardHeader className="space-y-2">

                    {/* Título */}
                    <CardTitle className="line-clamp-2 text-sm font-medium leading-tight">
                        {product.title}
                    </CardTitle>

                    {/* Preço */}
                    <CardDescription className="text-lg font-semibold text-primary">
                        {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </CardDescription>

                </CardHeader>
            </Link>

            {/* Footer (ações) */}
            <CardFooter className="flex items-center justify-between px-4 pb-4">

                {/* Botão favorito */}
                <ButtonFavorite
                    favorite={favorite}
                    handleFavorite={handleFavorite}
                />

                {/* Botão ação */}
                <span className="text-sm text-muted-foreground group-hover:text-primary transition">
                    <Link href={`/products/${product.id}`}>
                        Ver mais →
                    </Link>
                </span>

            </CardFooter>
        </Card>
    );
}