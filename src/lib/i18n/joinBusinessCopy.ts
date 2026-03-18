import type { HomeLocale } from "@/lib/i18n/homeCopy";

export const joinBusinessCopy: Record<
  HomeLocale,
  {
    title: string;
    subtitle: string;
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
    title: "Take Your Business to Every Corner of Bahrain",
    subtitle:
      "Join Dari to reach customers across the kingdom and get the support you need to grow your business",
    emailPlaceholder: "Enter email",
    phonePlaceholder: "Enter phone number",
    businessNamePlaceholder: "Enter business name",
    send: "Send",
    submitting: "Sending…",
    success: "Thank you for your interest!",
    error: "Something went wrong. Please try again.",
  },
  ar: {
    title: "شكراً لاهتمامكم.",
    subtitle:
      "انضم إلى داري للوصول إلى العملاء عبر المملكة والحصول على الدعم الذي تحتاجه لنمو عملك",
    emailPlaceholder: "أدخل البريد الإلكتروني",
    phonePlaceholder: "أدخل رقم الهاتف",
    businessNamePlaceholder: "أدخل اسم المتجر",
    send: "إرسال",
    submitting: "جاري الإرسال…",
    success: "شكراً لاهتمامكم!",
    error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
  },
};
