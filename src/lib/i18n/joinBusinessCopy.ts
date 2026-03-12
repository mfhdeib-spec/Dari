import type { HomeLocale } from "@/lib/i18n/homeCopy";

export const joinBusinessCopy: Record<
  HomeLocale,
  {
    title: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    businessNamePlaceholder: string;
    send: string;
    submitting: string;
    success: string;
    error: string;
  }
> = {
  en: {
    title: "Thank you for showing interest.",
    emailPlaceholder: "Enter email",
    phonePlaceholder: "Enter phone number",
    businessNamePlaceholder: "Enter business name",
    send: "Send",
    submitting: "Sending…",
    success: "Thanks! We'll be in touch.",
    error: "Something went wrong. Please try again.",
  },
  ar: {
    title: "شكراً لاهتمامكم.",
    emailPlaceholder: "أدخل البريد الإلكتروني",
    phonePlaceholder: "أدخل رقم الهاتف",
    businessNamePlaceholder: "أدخل اسم المتجر",
    send: "إرسال",
    submitting: "جاري الإرسال…",
    success: "شكراً! سنتواصل معكم.",
    error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
  },
};
