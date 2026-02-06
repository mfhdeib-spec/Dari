export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

export type ProductDesigner = {
  name: { en: string; ar: string };
  subtitle: { en: string; ar: string };
};

export type ProductDetails = {
  designer: ProductDesigner;
  availableSizes: ProductSize[];
  defaultSize: ProductSize;
};

const defaultDetails: ProductDetails = {
  designer: {
    name: { en: "Fatma", ar: "فاطمة" },
    subtitle: { en: "Designed and knitted by Fatma", ar: "مصمم ومحاك بواسطة فاطمة" },
  },
  availableSizes: ["XS", "S", "M", "L", "XL"],
  defaultSize: "S",
};

export const productDetailsById: Record<string, ProductDetails> = {
  "p-blue-abaya": defaultDetails,
  "p-wardrobe-1": defaultDetails,
  "p-essentials-1": defaultDetails,
  "p-utraanet-black-1": defaultDetails,
  "p-utraanet-black-2": defaultDetails,
  "p-wardrobe-2": defaultDetails,
  "p-essentials-2": defaultDetails,
  "p-classic-black-tee": defaultDetails,
};

export function getProductDetails(productId: string): ProductDetails {
  return productDetailsById[productId] ?? defaultDetails;
}

