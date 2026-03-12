/**
 * Finds duplicate image files in public/clothing/ by content hash and outputs
 * product IDs to remove so each unique image is used by exactly one product.
 * Run from repo root: node scripts/find-duplicate-images.js [--apply]
 * Use --apply to remove those products from products.ts and productDetails.ts.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const CLOTHING_DIR = path.join(ROOT, "public", "clothing");
const PRODUCTS_PATH = path.join(ROOT, "src", "lib", "mock", "products.ts");
const PRODUCT_DETAILS_PATH = path.join(ROOT, "src", "lib", "mock", "productDetails.ts");

function getImagePathToProductId(productsContent) {
  const ids = [...productsContent.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
  const srcs = [...productsContent.matchAll(/imageSrc:\s*"([^"]+)"/g)].map((m) => m[1]);
  const map = {};
  for (let i = 0; i < ids.length && i < srcs.length; i++) {
    const fullPath = srcs[i];
    const filename = path.basename(fullPath);
    map[filename] = { productId: ids[i], imagePath: fullPath };
  }
  return map;
}

function removeProductsFromProductsTs(content, idsToRemove) {
  const nl = "\\r?\\n";
  let out = content;
  for (const id of idsToRemove) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
      "  \\{\\s*" + nl + "\\s*id: \"" + escaped + "\",[\\s\\S]*?" + nl + "  \\}(,\\s*" + nl + "|\\s*" + nl + "\\]);",
      "g"
    );
    out = out.replace(re, (match) => (match.endsWith("];") ? "\n];" : ""));
  }
  return out;
}

function removeProductsFromProductDetailsTs(content, idsToRemove) {
  const set = new Set(idsToRemove);
  const lines = content.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^\s*"([^"]+)":\s*defaultDetails,?\s*$/);
    if (m && set.has(m[1])) continue;
    out.push(line);
  }
  return out.join("\n");
}

function main() {
  const apply = process.argv.includes("--apply");

  if (!fs.existsSync(CLOTHING_DIR)) {
    console.error("public/clothing/ not found.");
    process.exit(1);
  }

  const files = fs.readdirSync(CLOTHING_DIR).filter((f) => f.endsWith(".png"));
  if (files.length === 0) {
    console.error("No PNG files in public/clothing/. Add images and run again.");
    process.exit(1);
  }

  const productsContent = fs.readFileSync(PRODUCTS_PATH, "utf8");
  const pathToProduct = getImagePathToProductId(productsContent);

  const hashToFiles = {};
  for (const file of files) {
    const filePath = path.join(CLOTHING_DIR, file);
    const data = fs.readFileSync(filePath);
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    if (!hashToFiles[hash]) hashToFiles[hash] = [];
    hashToFiles[hash].push(file);
  }

  const productIdsToRemove = [];
  const duplicateFilePaths = [];

  for (const [hash, filenames] of Object.entries(hashToFiles)) {
    if (filenames.length <= 1) continue;
    const sorted = [...filenames].sort();
    const duplicates = sorted.slice(1);
    for (const dup of duplicates) {
      const info = pathToProduct[dup];
      if (info) {
        productIdsToRemove.push(info.productId);
        duplicateFilePaths.push(path.join(CLOTHING_DIR, dup));
      }
    }
  }

  if (productIdsToRemove.length === 0) {
    console.log("No duplicate images found. No product IDs to remove.");
    return;
  }

  console.log("Product IDs to remove (duplicate images):");
  console.log(JSON.stringify(productIdsToRemove, null, 2));
  console.log("\nDuplicate image files (optional cleanup):");
  duplicateFilePaths.forEach((p) => console.log(p));

  if (apply) {
    const newProducts = removeProductsFromProductsTs(productsContent, productIdsToRemove);
    fs.writeFileSync(PRODUCTS_PATH, newProducts, "utf8");
    const detailsContent = fs.readFileSync(PRODUCT_DETAILS_PATH, "utf8");
    const newDetails = removeProductsFromProductDetailsTs(detailsContent, productIdsToRemove);
    fs.writeFileSync(PRODUCT_DETAILS_PATH, newDetails, "utf8");
    console.log("\nApplied: removed " + productIdsToRemove.length + " product(s) from products.ts and productDetails.ts.");
  } else {
    console.log("\nRun with --apply to remove these products from products.ts and productDetails.ts.");
  }
}

main();
