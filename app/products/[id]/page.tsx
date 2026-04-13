"use client";

import ButtonFavorite from "@/components/ButtonFavorite";
import CarrouselImage from "@/components/CarrouselImage";
import LoadingCard from "@/components/LoadingCard";
import { getProductById } from "@/services/productService";
import { useFavoritesStore } from "@/store/useFavoriteStore";
import { Product } from "@/types/Product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
    const params = useParams<{id : string}>();
    const id = Number(params.id);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id])

    if (loading) {
        return (
            <section className="container mx-auto py-8 px-4">
                <LoadingCard />
            </section>
        );
    }

    if (error || !product) {
        return (
            <section className="container mx-auto py-8 px-4">
                <p>Produto não encontrado. Tente novamente.</p>
            </section>
        );
    }

    const favorite = isFavorite(product.id);
    const handleFavorite = () => {
        if(favorite){
            removeFavorite(product.id);
        }else{
            addFavorite(product);
        }
    };

    return (
        <section className="container mx-auto py-8 px-4">

            {/* Header (título + botão) */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">
                    {product.title}
                </h1>

                <ButtonFavorite
                    favorite={favorite}
                    handleFavorite={handleFavorite}
                />
            </div>

            {/* Layout principal */}
            <div className="grid md:grid-cols-2 gap-8">

                {/* Imagens */}
                <CarrouselImage product={product} />

                {/* Informações */}
                <div className="flex flex-col gap-4">

                    {/* Preço */}
                    <p className="text-2xl font-semibold text-primary">
                        {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </p>

                    {/* Descrição */}
                    <div>
                        <h2 className="font-semibold">Descrição</h2>
                        <p className="text-muted-foreground">
                            {product.description}
                        </p>
                    </div>

                    {/* Detalhes */}
                    <dl className="space-y-2">
                        <div>
                            <dt className="font-medium">Categoria:</dt>
                            <dd className="text-muted-foreground">
                                {product.category}
                            </dd>
                        </div>

                        <div>
                            <dt className="font-medium">Marca:</dt>
                            <dd className="text-muted-foreground">
                                {product.brand}
                            </dd>
                        </div>

                        <div>
                            <dt className="font-medium">Avaliação:</dt>
                            <dd className="text-muted-foreground">
                                ⭐ {product.rating}
                            </dd>
                        </div>
                    </dl>

                </div>
            </div>
        </section>
    );
}