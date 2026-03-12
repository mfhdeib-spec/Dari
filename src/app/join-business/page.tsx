"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/home/Header";
import { homeCopy } from "@/lib/i18n/homeCopy";
import { joinBusinessCopy } from "@/lib/i18n/joinBusinessCopy";
import { useLocale } from "@/lib/i18n/useLocale";

const TARGET_EMAIL = "m.f.hdeib@gmail.com";

export default function JoinBusinessPage() {
  const { locale, setLocale } = useLocale();
  const copy = homeCopy[locale];
  const bcopy = joinBusinessCopy[locale];
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");

  const allFilled =
    email.trim() !== "" && phone.trim() !== "" && businessName.trim() !== "";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFilled) return;
    const subject = "Join as a Business";
    const body = `Email: ${email.trim()}\nPhone: ${phone.trim()}\nBusiness name: ${businessName.trim()}`;
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} showBackButton backLabel={copy.back} />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {bcopy.title}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full flex-col gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={bcopy.emailPlaceholder}
            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={bcopy.phonePlaceholder}
            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            required
          />
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder={bcopy.businessNamePlaceholder}
            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            required
          />
          <button
            type="submit"
            disabled={!allFilled}
            className="mt-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bcopy.send}
          </button>
        </form>
      </main>
    </div>
  );
}
