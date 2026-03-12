import type { HomeLocale } from "@/lib/i18n/homeCopy";

export const checkoutCopy: Record<
  HomeLocale,
  {
    title: string;
    description: string;
    emailPlaceholder: string;
    submit: string;
  }
> = {
  en: {
    title: "You've discovered us early! 🎉",
    description:
      "We aren't quite open for orders yet—we're still onboarding your favorite local shops.",
    emailPlaceholder: "Enter email",
    submit: "Submit",
  },
  ar: {
    title: "اكتشفتمونا باكراً! 🎉",
    description:
      "لسنا مفتوحين للطلبات بعد—ما زلنا نضيف محلاتكم المحلية المفضلة.",
    emailPlaceholder: "أدخل البريد الإلكتروني",
    submit: "إرسال",
  },
};
