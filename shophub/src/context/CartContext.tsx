"use client";

import { createContext, useContext, useState } from "react";
import { Product } from "@/types/Product";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  quitarFromCart: (productId: number) => void;
  restartCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Product[]>([]);

  const costoTotal = cart.reduce((total, item) => total + (item.price * (item.quantityCart ?? 0)), 0);

  const addToCart = (product: Product) => {
    if(cart.some((item) => item.id === product.id)) {
      setCart((prev) => prev.map((item) => item.id === product.id ? { ...item, quantityCart: (item.quantityCart ?? 0) + 1 } : item));
    } else {
      setCart((prev) => [...prev, { ...product, quantityCart: 1 }]);
    }
  };

  const quitarFromCart = (productId: number) => {
    try {
        setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantityCart: (item.quantityCart ?? 0) - 1 } : item).filter((item) => (item.quantityCart ?? 0) > 0));
    } catch (error) {
        console.error("Error al quitar el producto del carrito:", error);
    }
  }

  const restartCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, quitarFromCart, restartCart, costoTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}