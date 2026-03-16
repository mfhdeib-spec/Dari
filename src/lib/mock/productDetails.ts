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

// Local Bahraini names – women for clothing, bakery, self care; men for crafts
const bahrainiWomen: ProductDesigner[] = [
  { name: { en: "Fatima", ar: "فاطمة" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Mariam", ar: "مريم" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Noor", ar: "نور" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Layla", ar: "ليلى" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Hessa", ar: "حصة" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Amal", ar: "أمل" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Zainab", ar: "زينب" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Noura", ar: "نورة" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Sara", ar: "سارة" }, subtitle: { en: "", ar: "" } },
];
const bahrainiMen: ProductDesigner[] = [
  { name: { en: "Mohammed", ar: "محمد" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Ahmed", ar: "أحمد" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Ali", ar: "علي" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Hassan", ar: "حسان" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Khalid", ar: "خالد" }, subtitle: { en: "", ar: "" } },
  { name: { en: "Hamad", ar: "حمد" }, subtitle: { en: "", ar: "" } },
];

const productIds = [
  "p-abaya-01", "p-abaya-03", "p-abaya-04", "p-abaya-olive-accents", "p-abaya-grey-pattern",
  "p-abaya-green-gold-lining", "p-abaya-silver-trim-ruffles", "p-thobe-black", "p-abaya-colorful-cuffs",
  "p-abaya-gold-blue-embroidery", "p-abaya-gold-palm-embroidery", "p-abaya-royal-blue-velvet",
  "p-abaya-royal-blue-embroidered", "p-abaya-deep-blue-embroidered", "p-abaya-maroon-velvet",
  "p-craft-lantern", "p-craft-calligraphy-vase", "p-craft-lidded-basket", "p-craft-kilim-cushion",
  "p-craft-woven-container", "p-craft-painted-carafe", "p-craft-baskets-set",
  "p-bakery-white-bread", "p-bakery-rosemary-artisan", "p-bakery-brownies", "p-bakery-sourdough-loaf",
  "p-bakery-chocolate-chip-brownies", "p-bakery-rustic-sourdough", "p-bakery-pumpkin-walnut",
  "p-bakery-rosemary-sea-salt", "p-bakery-banana-walnut", "p-bakery-pumpkin-swirl",
  "p-selfcare-rose-toner", "p-selfcare-nourishing-moisture", "p-selfcare-sandalwood-oil",
  "p-selfcare-desert-bloom-cream",
];

function isCraftProduct(id: string): boolean {
  return id.startsWith("p-craft-");
}

function buildProductDetailsById(): Record<string, ProductDetails> {
  const out: Record<string, ProductDetails> = {};
  let womenIndex = 0;
  let menIndex = 0;
  productIds.forEach((id) => {
    const pool = isCraftProduct(id) ? bahrainiMen : bahrainiWomen;
    const index = isCraftProduct(id) ? menIndex++ : womenIndex++;
    out[id] = {
      designer: pool[index % pool.length],
      availableSizes: ["XS", "S", "M", "L", "XL"],
      defaultSize: "S",
    };
  });
  return out;
}

export const productDetailsById: Record<string, ProductDetails> = buildProductDetailsById();

const defaultDetails: ProductDetails = {
  designer: bahrainiWomen[0],
  availableSizes: ["XS", "S", "M", "L", "XL"],
  defaultSize: "S",
};

export function getProductDetails(productId: string): ProductDetails {
  return productDetailsById[productId] ?? defaultDetails;
}

