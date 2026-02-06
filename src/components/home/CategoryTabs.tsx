"use client";

import type { HomeLocale } from "@/lib/i18n/homeCopy";
import type { ProductCategoryKey } from "@/lib/mock/products";

type Props = {
  locale: HomeLocale;
  categories: Array<{ key: ProductCategoryKey; label: { en: string; ar: string } }>;
  selected: ProductCategoryKey;
  onSelect: (next: ProductCategoryKey) => void;
};

export default function CategoryTabs({
  locale,
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="mt-10 border-b border-black/5">
        <div className="-mb-px flex items-center gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => {
            const isActive = c.key === selected;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => onSelect(c.key)}
                className={[
                  "whitespace-nowrap pb-3 text-sm font-medium transition",
                  isActive
                    ? "border-b-2 border-neutral-900 text-neutral-900"
                    : "border-b-2 border-transparent text-neutral-500 hover:text-neutral-800",
                ].join(" ")}
              >
                {c.label[locale]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

