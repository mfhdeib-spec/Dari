"use client";

import Link from "next/link";
import { CartIcon, UserIcon } from "@/components/home/icons";
import { useCart } from "@/context/CartContext";
import type { HomeLocale } from "@/lib/i18n/homeCopy";

type Props = {
  locale: HomeLocale;
  onLocaleChange: (next: HomeLocale) => void;
  showBackButton?: boolean;
  backLabel?: string;
};

export default function Header({ locale, onLocaleChange, showBackButton, backLabel }: Props) {
  const { totalItemCount, openCart } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="border-b border-black/5">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {showBackButton && backLabel ? (
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50"
              aria-label={backLabel}
            >
              <span aria-hidden="true">←</span>
              {backLabel}
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold tracking-tight text-neutral-900"
              aria-label="Dari"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900 text-white">
                D
              </span>
            </Link>
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center rounded-full bg-neutral-100 p-1">
              <button
                type="button"
                onClick={() => onLocaleChange("ar")}
                className={[
                  "rounded-full px-3 py-1 text-xs font-medium transition",
                  locale === "ar"
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "text-neutral-700 hover:text-neutral-900",
                ].join(" ")}
              >
                Ar
              </button>
              <button
                type="button"
                onClick={() => onLocaleChange("en")}
                className={[
                  "rounded-full px-3 py-1 text-xs font-medium transition",
                  locale === "en"
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "text-neutral-700 hover:text-neutral-900",
                ].join(" ")}
              >
                Eng
              </button>
            </div>

            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Account"
            >
              <UserIcon className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              aria-label={totalItemCount > 0 ? `Cart (${totalItemCount} items)` : "Cart"}
              onClick={openCart}
            >
              <CartIcon className="h-5 w-5" />
              {totalItemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] font-medium text-white">
                  {totalItemCount > 99 ? "99+" : totalItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

