"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/services/productService";
import CarrouselImage from "@/components/product/CarrouselImage";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError(true);
      } finally {
        console.log(products)
        setLoading(false);
      }
    }
    loadProducts();
  }, [products]);

  return (
    <>
      {/* HERO */}
      <section className="w-full py-20 px-4 text-center bg-linear-to-b from-background to-muted">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-6">

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Encontre as melhores promoções em tempo real
          </h1>

          <p className="text-muted-foreground max-w-2xl">
            Receba ofertas atualizadas automaticamente de diversos sites
            e economize tempo e dinheiro.
          </p>

          <div className="flex gap-4">
            <Link href="/products">
              <Button size="lg">Ver promoções</Button>
            </Link>

            <Link href="/favorites">
              <Button variant="outline" size="lg">
                Meus favoritos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-3 text-center">

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Atualização constante</h3>
            <p className="text-muted-foreground text-sm">
              Promoções atualizadas automaticamente ao longo do dia.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Favoritos inteligentes</h3>
            <p className="text-muted-foreground text-sm">
              Salve produtos e acompanhe as melhores ofertas.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Tudo em um só lugar</h3>
            <p className="text-muted-foreground text-sm">
              Diversas lojas reunidas em uma única plataforma.
            </p>
          </div>

        </div>
      </section>

      {/* PRODUTOS EM DESTAQUE */}
      <section className="py-16 px-4 bg-muted/40">
        <div className="mx-auto max-w-6xl">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              Promoções em destaque
            </h2>

            <Link href="/products">
              <Button variant="ghost">Ver tudo →</Button>
            </Link>
          </div>

          {/* GRID DE PRODUTOS (placeholder) */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {/* Exemplo de card */}
            {products.map((item) => (
              <div key={item.id}
                className="border rounded-xl p-4 bg-background hover:shadow-md transition"
              >
                <CarrouselImage product={item}/>

                <h3 className="text-sm font-medium mb-2">
                  {item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
                </h3>

                <p className="text-primary font-semibold">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>
            )).filter((_, index) => index < 4)}

          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 px-4 text-center">
        <div className="mx-auto max-w-2xl flex flex-col gap-6">

          <h2 className="text-3xl font-bold">
            Nunca mais perca uma promoção
          </h2>

          <p className="text-muted-foreground">
            Acompanhe seus produtos favoritos e receba as melhores ofertas.
          </p>

          <Link href="/products">
            <Button size="lg">
              Começar agora
            </Button>
          </Link>

        </div>
      </section>

    </>
  );
}