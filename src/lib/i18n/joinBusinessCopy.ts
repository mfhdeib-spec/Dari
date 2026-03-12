import type { HomeLocale } from "@/lib/i18n/homeCopy";

export const joinBusinessCopy: Record<
  HomeLocale,
  {
    title: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    businessNamePlaceholder: string;
    send: string;
  }
> = {
  en: {
    title: "Thank you for showing interest.",
    emailPlaceholder: "Enter email",
    phonePlaceholder: "Enter phone number",
    businessNamePlaceholder: "Enter business name",
    send: "Send",
  },
  ar: {
    title: "شكراً لاهتمامكم.",
    emailPlaceholder: "أدخل البريد الإلكتروني",
    phonePlaceholder: "أدخل رقم الهاتف",
    businessNamePlaceholder: "أدخل اسم المتجر",
    send: "إرسال",
  },
};
