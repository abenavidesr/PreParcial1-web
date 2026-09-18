"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";


export default function Header() {
  const { cart } = useCart();
  const { restartCart } = useCart();


  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">
        ShopHub
      </Link>

      <div>
        <Link href="/checkout" className="mr-4">
          Carrito: {cart.reduce((total, item) => total + (item.quantityCart ?? 0), 0)} items
        </Link>
      </div>
      <div>
        <button
            onClick={() => restartCart()}
            className="ml-2 rounded bg-red-500 px-4 py-2 text-white"
        >
          Vaciar carrito
        </button>
      </div>
    </header>
  );
}