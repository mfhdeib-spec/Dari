"use client";

import Link from "next/link";
import { CartIcon, UserIcon } from "@/components/home/icons";
import type { HomeLocale } from "@/lib/i18n/homeCopy";

type Props = {
  locale: HomeLocale;
  onLocaleChange: (next: HomeLocale) => void;
};

export default function Header({ locale, onLocaleChange }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="border-b border-black/5">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold tracking-tight text-neutral-900"
            aria-label="Dari"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900 text-white">
              D
            </span>
          </Link>

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
              className="grid h-10 w-10 place-items-center rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Cart"
            >
              <CartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

