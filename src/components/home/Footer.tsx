"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/useLocale";

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="m11.54 22.351.07.04.028.016a.38.38 0 0 0 .154-.015c.046-.012.09-.034.128-.066l-.046.027.046-.027a.38.38 0 0 0 .093-.09l.008-.011a.38.38 0 0 0 .06-.076l.012-.015.005-.006.002-.003.001-.001L12 22.35l-.002.002-.003.002-.005.006-.012.015a.38.38 0 0 1-.06.076l-.008.011a.38.38 0 0 1-.093.09l-.046.027.046-.027a.38.38 0 0 1-.128.066.38.38 0 0 1-.154.015l-.028-.016.07-.04C3.69 18.315 2 14.739 2 10.5 2 5.25 6.25 1 12 1s10 4.25 10 9.5c0 4.239-1.69 7.815-4.46 10.851l-.07.04-.07-.04ZM12 3c-4.97 0-8 3.582-8 7.5 0 3.192 1.432 5.961 3.824 8.353L12 20.696l4.176-4.846C18.568 16.461 20 13.692 20 10.5 20 6.582 16.97 3 12 3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4.25-8 4.75-8-4.75V6l8 4.75L20 6v2.25Z" />
    </svg>
  );
}

export default function Footer() {
  const { locale } = useLocale();
  const isRtl = locale === "ar";

  const emailAddress = "dariapp.bh@gmail.com";
  const instagramUrl = "https://www.instagram.com/dari.appbh/";

  return (
    <footer
      className="shrink-0 border-t border-neutral-200 bg-neutral-100"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-neutral-900"
          aria-label="Dari Bahrain"
        >
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg sm:h-9 sm:w-9">
            <Image
              src="/dari-logo.png"
              alt=""
              fill
              className="object-contain"
              sizes="36px"
            />
          </span>
          <span>Dari Bahrain</span>
        </Link>

        <div
          className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-neutral-500 sm:gap-x-6 ${
            isRtl ? "sm:flex-row-reverse" : ""
          }`}
        >
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 hover:text-neutral-700"
            aria-label="dari.appbh"
          >
            <InstagramIcon className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-neutral-700" />
            <span>dari.appbh</span>
          </a>
          <a
            href={`mailto:${emailAddress}`}
            className="group flex items-center gap-1.5 hover:text-neutral-700"
            aria-label={emailAddress}
          >
            <EmailIcon className="h-4 w-4 text-neutral-500 transition-colors group-hover:text-neutral-700" />
            <span>{emailAddress}</span>
          </a>
          <span className="flex items-center gap-1.5">
            <PinIcon className="h-4 w-4 text-neutral-500" />
            <span>Bahrain</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
