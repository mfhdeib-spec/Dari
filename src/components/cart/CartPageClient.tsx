"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import { useCart } from "@/context/CartContext";
import { productCopy } from "@/lib/i18n/productCopy";
import { useLocale } from "@/lib/i18n/useLocale";
import { getProductDetails } from "@/lib/mock/productDetails";
import { getProductById } from "@/lib/mock/products";
import type { Product } from "@/lib/mock/products";

const DELIVERY_COST = 1;

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

export default function CartPageClient() {
  const { locale, setLocale } = useLocale("en");
  const { items } = useCart();
  const pcopy = productCopy[locale];

  const displayCurrency: Product["currency"] =
    items.length > 0 ? getProductById(items[0].productId)?.currency ?? "USD" : "USD";
  const subtotal = items.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const total = subtotal + DELIVERY_COST;

  return (
    <div className="min-h-screen bg-white">
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        showBackButton
        backLabel={pcopy.back}
      />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 flex flex-wrap">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-neutral-600">{pcopy.cartEmpty}</p>
            <Link
              href="/"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              {pcopy.continueShopping}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <section className="w-full md:flex-1 min-w-0 h-fit">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                {pcopy.bag}
              </h1>
              <ul className="mt-6 flex flex-col gap-8">
                {items.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  const details = getProductDetails(item.productId);
                  const designerName = details.designer.name[locale];
                  const name = product.name[locale];
                  const lineTotal = product.price * item.quantity;
                  return (
                    <li
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 border-b border-neutral-200 pb-8 last:border-0"
                    >
                      <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:h-36 sm:w-32">
                        <Image
                          src={product.imageSrc}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-semibold text-neutral-900">
                          {name}
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500">
                          {pcopy.madeBy} {designerName}
                        </p>
                        <p className="mt-2 text-sm text-neutral-700 underline underline-offset-2">
                          {pcopy.size} {item.size}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                          <span className="font-medium text-neutral-900">
                            {item.quantity}
                          </span>
                          <span className="text-neutral-600">
                            {formatPrice(lineTotal, product.currency, locale)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="w-full md:flex-1 min-w-0 h-fit md:sticky md:top-24 md:self-start">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
                {pcopy.summary}
              </h2>
              <div className="mt-6 space-y-3 rounded-xl border border-neutral-200 bg-neutral-50/50 p-5">
                <div className="flex justify-between text-sm text-neutral-700">
                  <span>{pcopy.subtotal}</span>
                  <span>{formatPrice(subtotal, displayCurrency, locale)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-700">
                  <span>{pcopy.delivery}</span>
                  <span>{formatPrice(DELIVERY_COST, displayCurrency, locale)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between font-semibold text-neutral-900">
                    <span>{pcopy.total}</span>
                    <span>{formatPrice(total, displayCurrency, locale)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout/complete"
                  className="mt-4 block w-full rounded-full bg-neutral-900 py-3 text-center text-sm font-medium text-white hover:bg-neutral-800"
                >
                  {pcopy.payNow}
                </Link>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
