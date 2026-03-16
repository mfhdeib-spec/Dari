"use client";

import CartSidebar from "@/components/cart/CartSidebar";
import Footer from "@/components/home/Footer";
import { CartProvider as CartContextProvider } from "@/context/CartContext";
import { LocaleProvider } from "@/context/LocaleContext";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <CartContextProvider>
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <CartSidebar />
      </CartContextProvider>
    </LocaleProvider>
  );
}
