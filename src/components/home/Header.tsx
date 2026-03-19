"use client";

import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@/components/home/icons";
import { homeCopy, type HomeLocale } from "@/lib/i18n/homeCopy";

type Props = {
  locale: HomeLocale;
  onLocaleChange: (next: HomeLocale) => void;
  showBackButton?: boolean;
  backLabel?: string;
};

export default function Header({ locale, onLocaleChange, showBackButton, backLabel }: Props) {
  const copy = homeCopy[locale];
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
              aria-label={copy.dari}
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-xl">
                <Image
                  src="/dari-logo.png"
                  alt={copy.dari}
                  fill
                  className="object-contain"
                  sizes="36px"
                  priority
                />
              </span>
            </Link>
          )}

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/join-business"
              className="rounded-full border-2 border-neutral-900 bg-white px-4 py-2 text-xs font-medium text-neutral-900 hover:bg-neutral-50 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {copy.joinAsBusiness}
            </Link>
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
              aria-label={copy.account}
            >
              <UserIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

