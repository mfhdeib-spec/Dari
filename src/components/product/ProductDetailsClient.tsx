"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/home/Header";
import ProductCard from "@/components/home/ProductCard";
import { HeartIcon } from "@/components/home/icons";
import { homeCopy } from "@/lib/i18n/homeCopy";
import { productCopy } from "@/lib/i18n/productCopy";
import { useLocale } from "@/lib/i18n/useLocale";
import { getProductDetails, type ProductSize } from "@/lib/mock/productDetails";
import type { Product } from "@/lib/mock/products";

type Props = {
  product: Product;
  youMightAlsoLike: Product[];
};

export default function ProductDetailsClient({ product, youMightAlsoLike }: Props) {
  const { locale, setLocale } = useLocale("en");
  const copy = homeCopy[locale];
  const pcopy = productCopy[locale];

  const details = useMemo(() => getProductDetails(product.id), [product.id]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(details.defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const designerName = details.designer.name[locale];
  const designerSubtitle = details.designer.subtitle[locale];

  const priceText = (() => {
    try {
      return new Intl.NumberFormat(locale === "ar" ? "ar-BH" : "en-US", {
        style: "currency",
        currency: product.currency,
        maximumFractionDigits: 2,
      }).format(product.price);
    } catch {
      const symbol = product.currency === "BHD" ? "BHD" : "$";
      return `${product.price.toFixed(2)} ${symbol}`;
    }
  })();

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200/70">
            <Image
              src={product.imageSrc}
              alt={product.name[locale]}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>

          <div className="pt-2">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {product.name[locale]}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-neutral-200" aria-hidden="true" />
              <div>
                <div className="text-sm font-medium text-neutral-900">
                  {pcopy.by} {designerName}
                </div>
                <div className="text-xs text-neutral-500">{designerSubtitle}</div>
              </div>
            </div>

            <div className="mt-7 text-sm font-semibold text-neutral-900">{priceText}</div>

            <div className="mt-8">
              <div className="text-[10px] font-semibold tracking-widest text-neutral-500">
                {pcopy.selectSize}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {details.availableSizes.map((s) => {
                  const active = s === selectedSize;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={[
                        "grid h-9 w-10 place-items-center rounded-md border text-xs font-medium transition",
                        active
                          ? "border-neutral-900 text-neutral-900"
                          : "border-neutral-200 text-neutral-600 hover:border-neutral-400",
                      ].join(" ")}
                      aria-pressed={active}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] font-semibold tracking-widest text-neutral-500">
                {pcopy.quantity}
              </div>
              <div className="mt-3 inline-flex items-center rounded-md border border-neutral-200">
                <button
                  type="button"
                  className="grid h-9 w-10 place-items-center text-neutral-700 hover:bg-neutral-50"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <div className="grid h-9 w-12 place-items-center text-sm font-medium text-neutral-900">
                  {quantity}
                </div>
                <button
                  type="button"
                  className="grid h-9 w-10 place-items-center text-neutral-700 hover:bg-neutral-50"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-medium text-white hover:bg-neutral-800"
                onClick={() => {
                  // UI-only for now (mock)
                  void selectedSize;
                }}
              >
                {pcopy.addToCart}
              </button>

              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-md border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                onClick={() => setIsFavorite((v) => !v)}
                aria-pressed={isFavorite}
                aria-label="Add to favourite"
              >
                <HeartIcon className={["h-5 w-5", isFavorite ? "fill-neutral-900 stroke-neutral-900" : ""].join(" ")} />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              {pcopy.youMightAlsoLike}
            </h2>
            <div className="text-[10px] font-semibold tracking-widest text-neutral-400">
              {pcopy.similarProducts}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {youMightAlsoLike.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="block">
                <ProductCard
                  locale={locale}
                  product={p}
                  stockLabel={{ inStock: copy.inStock, outOfStock: copy.outOfStock }}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

