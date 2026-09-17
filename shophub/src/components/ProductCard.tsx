"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/Product";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={200}
        height={200}
      />

      <h2>{product.title}</h2>
      <p>Categoría: {product.category}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>

      <Link
        href={`/productos/${product.id}`}
        className="block mt-2 underline"
      >
        Ver detalle
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 rounded bg-black px-4 py-2 text-white"
      >
        Agregar al carrito
      </button>
    </div>
  );
}