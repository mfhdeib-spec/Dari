"use client";

import Link from "next/link";
import type { HomeLocale } from "@/lib/i18n/homeCopy";
import type { Product } from "@/lib/mock/products";
import ProductCard from "@/components/home/ProductCard";

type Props = {
  locale: HomeLocale;
  products: Product[];
  stockLabel: { inStock: string; outOfStock: string };
  emptyLabel: string;
};

export default function ProductGrid({
  locale,
  products,
  stockLabel,
  emptyLabel,
}: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      {products.length === 0 ? (
        <div className="py-14 text-center text-sm text-neutral-500">
          {emptyLabel}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="block">
              <ProductCard locale={locale} product={p} stockLabel={stockLabel} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

