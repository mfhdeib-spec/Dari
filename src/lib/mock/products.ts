export type ProductCategoryKey =
  | "all"
  | "clothing"
  | "bakery_snacks"
  | "jewelry"
  | "crafts";

export type Product = {
  id: string;
  name: { en: string; ar: string };
  category: Exclude<ProductCategoryKey, "all">;
  price: number;
  currency: "USD" | "BHD";
  inStock: boolean;
  imageSrc: string;
};

export const categories: Array<{
  key: ProductCategoryKey;
  label: { en: string; ar: string };
}> = [
  { key: "all", label: { en: "All", ar: "الكل" } },
  { key: "clothing", label: { en: "Clothing", ar: "ملابس" } },
  { key: "bakery_snacks", label: { en: "Bakery & Snacks", ar: "مخبوزات ووجبات خفيفة" } },
  { key: "jewelry", label: { en: "Jewlery", ar: "مجوهرات" } }, // keeping spelling to match design
  { key: "crafts", label: { en: "Crafts", ar: "حِرف" } },
];

export const products: Product[] = [
  {
    id: "p-blue-abaya",
    name: { en: "Blue Abaya", ar: "عباية زرقاء" },
    category: "clothing",
    price: 35,
    currency: "USD",
    inStock: true,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
  {
    id: "p-wardrobe-1",
    name: { en: "Monochromatic Wardrobe", ar: "أناقة أحادية اللون" },
    category: "clothing",
    price: 27,
    currency: "USD",
    inStock: true,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
  {
    id: "p-essentials-1",
    name: { en: "Essential Neutrals", ar: "أساسيات محايدة" },
    category: "clothing",
    price: 22,
    currency: "USD",
    inStock: true,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
  {
    id: "p-utraanet-black-1",
    name: { en: "UTRAANET Black", ar: "يوترا نت أسود" },
    category: "clothing",
    price: 43,
    currency: "USD",
    inStock: true,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
  // repeat a few for grid density (mock)
  {
    id: "p-utraanet-black-2",
    name: { en: "UTRAANET Black", ar: "يوترا نت أسود" },
    category: "clothing",
    price: 43,
    currency: "USD",
    inStock: true,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
  {
    id: "p-wardrobe-2",
    name: { en: "Monochromatic Wardrobe", ar: "أناقة أحادية اللون" },
    category: "clothing",
    price: 27,
    currency: "USD",
    inStock: true,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
  {
    id: "p-essentials-2",
    name: { en: "Essential Neutrals", ar: "أساسيات محايدة" },
    category: "clothing",
    price: 22,
    currency: "USD",
    inStock: true,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
  {
    id: "p-classic-black-tee",
    name: { en: "Classic Monochrome Tees", ar: "تيشيرتات كلاسيكية" },
    category: "clothing",
    price: 35,
    currency: "USD",
    inStock: false,
    imageSrc: "/mock/blue-abaya-v2.png",
  },
];

