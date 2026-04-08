"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";

export default function Home() {

  const [products, setPrducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts();
      setPrducts(data);
    };

    loadProducts();
  }, []);

  return (
    <>
    <section>
      <h1>Produtos</h1>

      {products.map((product: any) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </section>
    </>
  );
}
