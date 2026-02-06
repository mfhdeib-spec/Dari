export type HomeLocale = "en" | "ar";

export const homeCopy: Record<
  HomeLocale,
  {
    heroHeading: string;
    heroSubheading: string;
    explore: string;
    searchPlaceholder: string;
    noProducts: string;
    inStock: string;
    outOfStock: string;
  }
> = {
  en: {
    heroHeading: "Discover the Best of Bahrain, All in One Place",
    heroSubheading: "Empowering local hands, scaling regional crafts.",
    explore: "Explore",
    searchPlaceholder: "Search products",
    noProducts: "No products found.",
    inStock: "IN STOCK",
    outOfStock: "OUT OF STOCK",
  },
  ar: {
    heroHeading: "اكتشف الأفضل في البحرين، كلّه في مكان واحد",
    heroSubheading: "ندعم الأيدي المحلية ونوسع الحِرف الإقليمية.",
    explore: "استكشف",
    searchPlaceholder: "ابحث عن المنتجات",
    noProducts: "لا توجد منتجات.",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
  },
};

