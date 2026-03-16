"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { HomeLocale } from "@/lib/i18n/homeCopy";

const STORAGE_KEY = "dari_locale";

function applyLocaleToDocument(locale: HomeLocale) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.lang = locale;
  el.dir = locale === "ar" ? "rtl" : "ltr";
}

type LocaleContextValue = {
  locale: HomeLocale;
  setLocale: (next: HomeLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  defaultLocale = "ar",
}: {
  children: ReactNode;
  defaultLocale?: HomeLocale;
}) {
  const [locale, setLocaleState] = useState<HomeLocale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next = stored === "ar" || stored === "en" ? stored : defaultLocale;
    setLocaleState(next);
    applyLocaleToDocument(next);
  }, [defaultLocale]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    applyLocaleToDocument(locale);
  }, [locale]);

  const setLocale = useCallback((next: HomeLocale) => {
    setLocaleState(next);
  }, []);

  const value: LocaleContextValue = { locale, setLocale };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return ctx;
}
