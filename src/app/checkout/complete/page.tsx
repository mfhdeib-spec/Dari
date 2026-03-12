"use client";

import { useState, FormEvent } from "react";
import { checkoutCopy } from "@/lib/i18n/checkoutCopy";
import { useLocale } from "@/lib/i18n/useLocale";

type Status = "idle" | "submitting" | "success" | "error";

export default function CheckoutCompletePage() {
  const { locale } = useLocale();
  const copy = checkoutCopy[locale];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {copy.title}
        </h1>
        <p className="mt-3 text-neutral-700">{copy.description}</p>

        {status === "success" ? (
          <p className="mt-8 text-neutral-700" role="status">
            {copy.success}
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            action="#"
            className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              disabled={status === "submitting"}
              className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 disabled:opacity-70"
              required
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-70"
            >
              {status === "submitting" ? copy.submitting : copy.submit}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600" role="alert">
            {copy.error}
          </p>
        )}
      </main>
    </div>
  );
}
