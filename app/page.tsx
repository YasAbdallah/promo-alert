"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";
import LoadingCard from "@/components/LoadingCard";
import ProductListLayout from "@/components/ProductLayout";


export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try{
        const data = await getProducts();
        setProducts(data);
      }catch{
       setError(true); 
      }finally{
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if(loading){
    return (
      <ProductListLayout>
        {
          Array.from({length: 8}).map((_, index) => <LoadingCard key={index}/>)
        }
      </ProductListLayout>
    );
  }

  if(error){
    return (
      <ProductListLayout>
        <p>Erro ao carregar produtos. Tente novamente.</p>;
      </ProductListLayout>
    );
  }
  
  if(products.length === 0){
    return (
      <ProductListLayout>
        <p>Nenhum produto encontrado.</p>
      </ProductListLayout>
    );
  }

  return (
    <ProductListLayout>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </ProductListLayout>
  );
}
