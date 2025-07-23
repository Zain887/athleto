// context/CartContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  name: string;
  price: string;
  size: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  updateQuantity: (name: string, size: string, quantity: number) => void;
  removeFromCart: (name: string, size: string) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const updateQuantity = (name: string, size: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (name: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.name === name && item.size === size))
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, clearCart, updateQuantity, removeFromCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
