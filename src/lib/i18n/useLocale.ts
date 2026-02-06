"use client";

import { useEffect, useState } from "react";
import type { HomeLocale } from "@/lib/i18n/homeCopy";

const STORAGE_KEY = "dari_locale";

function applyLocaleToDocument(locale: HomeLocale) {
  const el = document.documentElement;
  el.lang = locale;
  el.dir = locale === "ar" ? "rtl" : "ltr";
}

export function useLocale(defaultLocale: HomeLocale = "en") {
  const [locale, setLocale] = useState<HomeLocale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = stored === "ar" || stored === "en" ? stored : defaultLocale;
    setLocale(next);
    applyLocaleToDocument(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    applyLocaleToDocument(locale);
  }, [locale]);

  return { locale, setLocale } as const;
}

