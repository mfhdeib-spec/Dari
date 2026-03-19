"use client";

import { usePathname } from "next/navigation";
import { CartIcon } from "@/components/home/icons";
import { useCart } from "@/context/CartContext";
import { productCopy } from "@/lib/i18n/productCopy";
import { useLocale } from "@/lib/i18n/useLocale";

export default function CartStickyCta() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const { totalItemCount, openCart } = useCart();
  const pcopy = productCopy[locale];

  if (totalItemCount === 0 || pathname !== "/") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4 sm:bottom-20">
      <button
        type="button"
        onClick={openCart}
        className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-neutral-900 px-6 text-sm font-medium text-white shadow-lg shadow-black/20 transition hover:bg-neutral-800"
        aria-label={pcopy.viewCart}
      >
        <span>{pcopy.viewCart}</span>
        <CartIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
