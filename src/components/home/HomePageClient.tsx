"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import CategoryTabs from "@/components/home/CategoryTabs";
import ProductGrid from "@/components/home/ProductGrid";
import { homeCopy, type HomeLocale } from "@/lib/i18n/homeCopy";
import {
  categories,
  products,
  type Product,
  type ProductCategoryKey,
} from "@/lib/mock/products";

function normalizeQuery(q: string) {
  return q.trim().toLowerCase();
}

function matchesProductQuery(p: Product, query: string) {
  if (!query) return true;
  const q = normalizeQuery(query);
  return (
    p.name.en.toLowerCase().includes(q) ||
    p.name.ar.toLowerCase().includes(q)
  );
}

export default function HomePageClient() {
  const [locale, setLocale] = useState<HomeLocale>("en");
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const productsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.documentElement;
    el.lang = locale;
    el.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const visibleProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryOk =
        selectedCategory === "all" || p.category === selectedCategory;
      const queryOk = matchesProductQuery(p, searchQuery);
      return categoryOk && queryOk;
    });
  }, [selectedCategory, searchQuery]);

  const copy = homeCopy[locale];

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} />

      <main>
        <Hero
          heading={copy.heroHeading}
          subheading={copy.heroSubheading}
          ctaLabel={copy.explore}
          onExplore={() =>
            productsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={copy.searchPlaceholder}
        />

        <section ref={productsRef} className="scroll-mt-24" aria-label="Products">
          <CategoryTabs
            locale={locale}
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <ProductGrid
            locale={locale}
            products={visibleProducts}
            emptyLabel={copy.noProducts}
            stockLabel={{ inStock: copy.inStock, outOfStock: copy.outOfStock }}
          />
        </section>
      </main>
    </div>
  );
}

