"use client";

import { useState, FormEvent } from "react";
import Header from "@/components/home/Header";
import { homeCopy } from "@/lib/i18n/homeCopy";
import { joinBusinessCopy } from "@/lib/i18n/joinBusinessCopy";
import { useLocale } from "@/lib/i18n/useLocale";

type Status = "idle" | "submitting" | "success" | "error";

export default function JoinBusinessPage() {
  const { locale, setLocale } = useLocale();
  const copy = homeCopy[locale];
  const bcopy = joinBusinessCopy[locale];
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isRtl = locale === "ar";

  const allFilled =
    email.trim() !== "" && phone.trim() !== "" && businessName.trim() !== "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!allFilled) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/vendors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim(),
          businessName: businessName.trim(),
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setPhone("");
        setBusinessName("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header locale={locale} onLocaleChange={setLocale} showBackButton backLabel={copy.back} />

      <main
        className={`mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col justify-center px-4 py-10 sm:px-6 ${
          isRtl ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">{bcopy.title}</h1>
        <p className="mt-4 text-neutral-700">{bcopy.subtitle}</p>

        {status === "success" ? (
          <p className="mt-8 text-neutral-900 text-xl font-bold sm:text-2xl" role="status">
            {bcopy.success}
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            action="#"
            className="mt-8 flex w-full flex-col gap-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={bcopy.emailPlaceholder}
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-70"
              required
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={bcopy.phonePlaceholder}
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-70"
              required
            />
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={bcopy.businessNamePlaceholder}
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-70"
              required
            />
            <button
              type="submit"
              disabled={!allFilled || status === "submitting"}
              className="mt-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? bcopy.submitting : bcopy.send}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {bcopy.error}
          </p>
        )}
      </main>
    </div>
  );
}
