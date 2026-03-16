"use client";

import CartSidebar from "@/components/cart/CartSidebar";
import { CartProvider as CartContextProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <CartContextProvider>
        {children}
        <CartSidebar />
      </CartContextProvider>
    </LocaleProvider>
  );
}
