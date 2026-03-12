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
    productsSection: string;
    account: string;
    cart: string;
    cartWithCount: string;
    dari: string;
    joinAsBusiness: string;
    back: string;
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
    productsSection: "Products",
    account: "Account",
    cart: "Cart",
    cartWithCount: "Cart ({{count}} items)",
    dari: "Dari",
    joinAsBusiness: "Join as a Business",
    back: "Back",
  },
  ar: {
    heroHeading: "من اهلنا ولالهنا، إكتشف الأسواق المحلية",
    heroSubheading: "ندعم الأيدي المحلية ونوسع الحِرف الإقليمية.",
    explore: "استكشف",
    searchPlaceholder: "ابحث عن المنتجات",
    noProducts: "لا توجد منتجات.",
    inStock: "متوفر",
    outOfStock: "غير متوفر",
    productsSection: "المنتجات",
    account: "الحساب",
    cart: "السلة",
    cartWithCount: "السلة ({{count}} عناصر)",
    dari: "داري",
    joinAsBusiness: "انضم كمتجر",
    back: "رجوع",
  },
};

