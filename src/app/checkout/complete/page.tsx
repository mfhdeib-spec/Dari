"use client";

import { useState, FormEvent } from "react";
import { checkoutCopy } from "@/lib/i18n/checkoutCopy";
import { useLocale } from "@/lib/i18n/useLocale";

const TARGET_EMAIL = "m.f.hdeib@gmail.com";

export default function CheckoutCompletePage() {
  const { locale } = useLocale();
  const copy = checkoutCopy[locale];
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const subject = "Early access signup";
    const body = `Signup email: ${trimmed}`;
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-neutral-700">{copy.description}</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            required
          />
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
          >
            {copy.submit}
          </button>
        </form>
      </main>
    </div>
  );
}
