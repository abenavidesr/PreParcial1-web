"use client";

import {useState, useEffect} from "react";
import {Product} from "@/types/Product";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
  const loadProducts = async () => {
    try {
      const response = await fetch(
        "https://dummyjson.com/products?limit=8&select=id,title,price,category,thumbnail,stock"
      );

      if (!response.ok) {
        throw new Error("Error al cargar productos");
      }

      const data = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  loadProducts();
}, []);
  return (
  <main>
    <h1>ShopHub</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  </main>
);
}