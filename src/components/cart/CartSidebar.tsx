"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useCart } from "@/context/CartContext";
import { productCopy } from "@/lib/i18n/productCopy";
import { useLocale } from "@/lib/i18n/useLocale";
import { getProductById } from "@/lib/mock/products";
import type { Product } from "@/lib/mock/products";

function formatPrice(price: number, currency: Product["currency"], locale: "en" | "ar") {
  try {
    return new Intl.NumberFormat(locale === "ar" ? "ar-BH" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    const symbol = currency === "BHD" ? "BHD" : "$";
    return `${price.toFixed(2)} ${symbol}`;
  }
}

export default function CartSidebar() {
  const router = useRouter();
  const { locale } = useLocale("en");
  const { items, isCartOpen, closeCart, updateQuantity, removeItem } = useCart();
  const pcopy = productCopy[locale];

  const handleOverlayClick = useCallback(() => closeCart(), [closeCart]);

  const handleViewCart = useCallback(() => {
    closeCart();
    router.push("/cart");
  }, [closeCart, router]);

  if (!isCartOpen) return null;

  const totalCents = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const firstCurrency = items.length > 0 ? getProductById(items[0].productId)?.currency : "USD";
  const totalFormatted = formatPrice(totalCents, firstCurrency, locale);

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/20"
        aria-hidden
        onClick={handleOverlayClick}
      />
      <aside
        className="fixed right-0 top-0 z-[110] flex h-full w-full max-w-sm flex-col border-l border-neutral-200 bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label={pcopy.shoppingCart}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">
            {pcopy.shoppingCart}
          </h2>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            aria-label={pcopy.remove}
            onClick={closeCart}
          >
            <span className="text-lg leading-none" aria-hidden>×</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-neutral-500">{pcopy.cartEmpty}</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const lineTotal = product.price * item.quantity;
                const name = product.name[locale];
                return (
                  <li
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-3 border-b border-neutral-100 pb-4 last:border-0"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                      <Image
                        src={product.imageSrc}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-white/90 text-neutral-600 shadow hover:bg-white hover:text-neutral-900"
                        aria-label={`${pcopy.remove} ${name}`}
                        onClick={() => removeItem(item.productId, item.size)}
                      >
                        <span className="text-xs leading-none">×</span>
                      </button>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-neutral-900">
                        {name}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-neutral-400" aria-hidden />
                        <span className="text-xs text-neutral-600">{item.size}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded border border-neutral-200">
                          <button
                            type="button"
                            className="grid h-7 w-7 place-items-center text-neutral-600 hover:bg-neutral-50"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.productId, item.size, -1)}
                          >
                            −
                          </button>
                          <span className="grid h-7 min-w-7 place-items-center px-1 text-sm font-medium text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="grid h-7 w-7 place-items-center text-neutral-600 hover:bg-neutral-50"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.productId, item.size, 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-medium text-neutral-900">
                          {formatPrice(lineTotal, product.currency, locale)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t border-neutral-200 px-4 py-4">
            <div className="mb-3 flex items-center justify-between text-base font-semibold text-neutral-900">
              <span>{pcopy.total}</span>
              <span>{totalFormatted}</span>
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-neutral-900 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              onClick={handleViewCart}
            >
              {pcopy.viewCart}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
