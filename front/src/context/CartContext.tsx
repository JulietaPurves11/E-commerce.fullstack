"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { useAuth } from "./AuthContext";

export interface CartItem extends IProduct {
  quantity: number;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);

  const storageKey = user ? `cart_${user.id}` : null;

  useEffect(() => {
    if (storageKey) {
    const saved = localStorage.getItem(storageKey);
    setCart(saved ? JSON.parse(saved) : []);
    } else {
      setCart([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, storageKey]);

  const addToCart = (product: IProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(item => item.id !== id));

  const increaseQuantity = (id: number) =>
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQuantity = (id: number) =>
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};
