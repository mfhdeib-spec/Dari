import type { HomeLocale } from "@/lib/i18n/homeCopy";

export const productCopy: Record<
  HomeLocale,
  {
    by: string;
    selectSize: string;
    quantity: string;
    addToCart: string;
    youMightAlsoLike: string;
    similarProducts: string;
  }
> = {
  en: {
    by: "By",
    selectSize: "SELECT SIZE",
    quantity: "QUANTITY",
    addToCart: "Add to cart",
    youMightAlsoLike: "You might also like",
    similarProducts: "SIMILAR PRODUCTS",
  },
  ar: {
    by: "بواسطة",
    selectSize: "اختر المقاس",
    quantity: "الكمية",
    addToCart: "أضف إلى السلة",
    youMightAlsoLike: "قد يعجبك أيضًا",
    similarProducts: "منتجات مشابهة",
  },
};

