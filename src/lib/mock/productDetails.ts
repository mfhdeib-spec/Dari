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
  "p-abaya-01": defaultDetails,
  "p-abaya-03": defaultDetails,
  "p-abaya-04": defaultDetails,
  "p-abaya-olive-accents": defaultDetails,
  "p-abaya-grey-pattern": defaultDetails,
  "p-abaya-green-gold-lining": defaultDetails,
  "p-abaya-silver-trim-ruffles": defaultDetails,
  "p-thobe-black": defaultDetails,
  "p-abaya-colorful-cuffs": defaultDetails,
  "p-abaya-gold-blue-embroidery": defaultDetails,
  "p-abaya-gold-palm-embroidery": defaultDetails,
  "p-abaya-royal-blue-velvet": defaultDetails,
  "p-abaya-royal-blue-embroidered": defaultDetails,
  "p-abaya-deep-blue-embroidered": defaultDetails,
  "p-abaya-maroon-velvet": defaultDetails,
  "p-craft-lantern": defaultDetails,
  "p-craft-calligraphy-vase": defaultDetails,
  "p-craft-lidded-basket": defaultDetails,
  "p-craft-kilim-cushion": defaultDetails,
  "p-craft-woven-container": defaultDetails,
  "p-craft-painted-carafe": defaultDetails,
  "p-craft-baskets-set": defaultDetails,
  "p-bakery-white-bread": defaultDetails,
  "p-bakery-rosemary-artisan": defaultDetails,
  "p-bakery-brownies": defaultDetails,
  "p-bakery-sourdough-loaf": defaultDetails,
  "p-bakery-chocolate-chip-brownies": defaultDetails,
  "p-bakery-rustic-sourdough": defaultDetails,
  "p-bakery-pumpkin-walnut": defaultDetails,
  "p-bakery-rosemary-sea-salt": defaultDetails,
  "p-bakery-banana-walnut": defaultDetails,
  "p-bakery-pumpkin-swirl": defaultDetails,
  "p-selfcare-rose-toner": defaultDetails,
  "p-selfcare-nourishing-moisture": defaultDetails,
  "p-selfcare-sandalwood-oil": defaultDetails,
  "p-selfcare-desert-bloom-cream": defaultDetails,
};

export function getProductDetails(productId: string): ProductDetails {
  return productDetailsById[productId] ?? defaultDetails;
}

