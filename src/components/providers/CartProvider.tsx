"use client";

import CartSidebar from "@/components/cart/CartSidebar";
import { CartProvider as CartContextProvider } from "@/context/CartContext";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartContextProvider>
      {children}
      <CartSidebar />
    </CartContextProvider>
  );
}
