"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductSize } from "@/lib/mock/productDetails";

export type CartLineItem = {
  productId: string;
  size: ProductSize;
  quantity: number;
};

type CartContextValue = {
  items: CartLineItem[];
  isCartOpen: boolean;
  totalItemCount: number;
  addItem: (productId: string, size: ProductSize, quantity: number) => void;
  updateQuantity: (productId: string, size: ProductSize, delta: number) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(
    (productId: string, size: ProductSize, quantity: number) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.productId === productId && i.size === size
        );
        if (existing) {
          return prev.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        }
        return [...prev, { productId, size, quantity }];
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, size: ProductSize, delta: number) => {
      setItems((prev) => {
        const next = prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity: i.quantity + delta }
            : i
        );
        return next.filter((i) => i.quantity > 0);
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, size: ProductSize) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && i.size === size)
      )
    );
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isCartOpen,
      totalItemCount,
      addItem,
      updateQuantity,
      removeItem,
      openCart,
      closeCart,
    }),
    [
      items,
      isCartOpen,
      totalItemCount,
      addItem,
      updateQuantity,
      removeItem,
      openCart,
      closeCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
