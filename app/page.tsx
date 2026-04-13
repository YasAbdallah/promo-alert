"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";
import LoadingCard from "@/components/LoadingCard";
import ProductListLayout from "@/components/ProductLayout";
import SearchInput from "@/components/SearchInput";


export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProducts = products.filter(product => {
    const term = searchTerm.toLowerCase();

    return (
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  })

  useEffect(() => {
    const loadProducts = async () => {
      try{
        const data = await getProducts();
        setProducts(data);
      }catch{
       setError(true); 
      }finally{
        console.log(products)
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if(loading){
    return (
      <ProductListLayout title="Produtos">
        {
          Array.from({length: 8}).map((_, index) => <LoadingCard key={index}/>)
        }
      </ProductListLayout>
    );
  }

  if(error){
    return (
      <ProductListLayout title="Produtos">
        <p>Erro ao carregar produtos. Tente novamente.</p>
      </ProductListLayout>
    );
  }
  
  if(products.length === 0){
    return (
      <ProductListLayout title="Produtos">
        <p>Nenhum produto encontrado.</p>
      </ProductListLayout>
    );
  }

  return (
    <>
    <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductListLayout title="Produtos">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </ProductListLayout>
    </>
  );
}
