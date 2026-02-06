"use client";

import Image from "next/image";

type Props = {
  heading: string;
  subheading: string;
  ctaLabel: string;
  onExplore: () => void;
};

export default function Hero({ heading, subheading, ctaLabel, onExplore }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <Image
            src="/mock/hero-v2.png"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 1100px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-white/10" />
        </div>

        <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
          <div className="max-w-xl">
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl sm:leading-tight lg:text-5xl">
              {heading}
            </h1>
            <p className="mt-4 max-w-md text-pretty text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7">
              {subheading}
            </p>

            <button
              type="button"
              onClick={onExplore}
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-10 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

