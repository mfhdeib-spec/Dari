"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Header from "@/components/home/Header";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/home/ProductCard";
import { HeartIcon } from "@/components/home/icons";
import { homeCopy } from "@/lib/i18n/homeCopy";
import { productCopy } from "@/lib/i18n/productCopy";
import { useLocale } from "@/lib/i18n/useLocale";
import { getProductDetails, type ProductSize } from "@/lib/mock/productDetails";
import { abayaSizeChartRows } from "@/lib/mock/sizeChart";
import type { Product } from "@/lib/mock/products";

const categoryEmoji: Record<Product["category"], string> = {
  clothing: "👗",
  bakery_snacks: "👨‍🍳",
  crafts: "🎨",
  self_care: "✨",
};

type Props = {
  product: Product;
  youMightAlsoLike: Product[];
};

export default function ProductDetailsClient({ product, youMightAlsoLike }: Props) {
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const { addItem } = useCart();
  const copy = homeCopy[locale];
  const pcopy = productCopy[locale];

  const details = useMemo(() => getProductDetails(product.id), [product.id]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(details.defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const designerName = details.designer.name[locale];

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
      <Header locale={locale} onLocaleChange={setLocale} showBackButton backLabel={pcopy.back} />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <section className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200/70">
            <Image
              src={product.imageSrc}
              alt={product.name[locale]}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>

          <div className="pt-4">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              {product.name[locale]}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-lg" aria-hidden="true">
                {categoryEmoji[product.category]}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-sm font-normal text-neutral-500">{pcopy.doneBy}</div>
                <div className="text-sm font-medium text-neutral-900">{designerName}</div>
              </div>
            </div>

            <div className="mt-8 text-sm font-semibold text-neutral-900">{priceText}</div>

            {product.category === "clothing" && (
              <div className="mt-10">
                <div className="text-[10px] font-semibold tracking-widest text-neutral-500">
                  {pcopy.selectSize}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
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
                {(() => {
                const row = abayaSizeChartRows.find((r) => r.size === selectedSize);
                if (!row) return null;
                return (
                  <p className="mt-4 text-sm text-neutral-900">
                    {pcopy.sizeChartAbayaLength}: {row.abayaLength}  {pcopy.sizeChartBodyHeight}: {row.bodyHeight}
                  </p>
                );
              })()}
              </div>
            )}

            <div className="mt-10">
              <div className="text-[10px] font-semibold tracking-widest text-neutral-500">
                {pcopy.quantity}
              </div>
              <div className="mt-4 inline-flex items-center rounded-md border border-neutral-200">
                <button
                  type="button"
                  className="grid h-9 w-10 place-items-center text-neutral-700 hover:bg-neutral-50"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label={pcopy.decreaseQuantity}
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
                  aria-label={pcopy.increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <button
                type="button"
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-neutral-900 px-6 text-sm font-medium text-white hover:bg-neutral-800"
                onClick={() => {
                  addItem(product.id, selectedSize, quantity);
                  router.push("/");
                }}
              >
                {pcopy.addToCart}
              </button>

              <button
                type="button"
                className="grid h-12 w-12 place-items-center rounded-md border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                onClick={() => setIsFavorite((v) => !v)}
                aria-pressed={isFavorite}
                aria-label={pcopy.addToFavourite}
              >
                <HeartIcon className={["h-5 w-5", isFavorite ? "fill-neutral-900 stroke-neutral-900" : ""].join(" ")} />
              </button>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              {pcopy.youMightAlsoLike}
            </h2>
            <div className="text-[10px] font-semibold tracking-widest text-neutral-400">
              {pcopy.similarProducts}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
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

