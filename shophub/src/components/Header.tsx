"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">
        ShopHub
      </Link>

      <div>
        Carrito: {cart.length}
      </div>
    </header>
  );
}