"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/Product";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { id } = await params;

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Error al cargar el producto");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [params]);

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="p-8">
      <Link href="/" className="underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl font-bold mb-4">
          {product.title}
        </h1>

        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
        />

        <div className="mt-4 space-y-2">
          <p>Categoría: {product.category}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </main>
  );
}