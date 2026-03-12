"use client";

import Image from "next/image";
import type { HomeLocale } from "@/lib/i18n/homeCopy";
import type { Product } from "@/lib/mock/products";

function formatPrice(amount: number, currency: Product["currency"], locale: HomeLocale) {
  try {
    return new Intl.NumberFormat(locale === "ar" ? "ar-BH" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    const symbol = currency === "BHD" ? "BD" : "$";
    return `${symbol}${amount.toFixed(2)}`;
  }
}

type Props = {
  locale: HomeLocale;
  product: Product;
  stockLabel: { inStock: string; outOfStock: string };
};

export default function ProductCard({ locale, product, stockLabel }: Props) {
  const stockText = product.inStock ? stockLabel.inStock : stockLabel.outOfStock;

  return (
    <article className="rounded-none bg-white">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[5px] bg-neutral-200/70">
        <Image
          src={product.imageSrc}
          alt={product.name[locale]}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-neutral-900 sm:text-[15px]">
          {product.name[locale]}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-4">
          <span
            className={[
              "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
              product.inStock
                ? "border-neutral-200 bg-white text-neutral-800"
                : "border-red-200 bg-red-50 text-red-700",
            ].join(" ")}
          >
            {stockText}
          </span>

          <span className="text-sm font-medium tabular-nums text-neutral-700">
            {formatPrice(product.price, product.currency, locale)}
          </span>
        </div>
      </div>
    </article>
  );
}

