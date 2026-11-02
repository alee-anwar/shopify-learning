// Week 1 Build — Catalog importer CLI
// Run:   npx tsx src/day06-build/index.ts --category mens-shirts --limit 5
// Check: npm run typecheck
//
// Flow:  fetch (api.ts) -> transform (transform.ts) -> save (here) -> summary

// STEP 7: imports
import "dotenv/config";
import { mkdir, writeFile } from "node:fs/promises";
import { fetchProducts } from "./api.js";
import { toCatalogProduct } from "./transform.js";


// STEP 8: Read command-line arguments.
// process.argv is an array of everything you typed, e.g.
//   ["node", "index.ts", "--category", "mens-shirts", "--limit", "5"]
// Write a small helper:
//   function getArg(name: string, fallback: string): string
//     - find the index of `--${name}` in process.argv
//     - if found, return the item right after it; otherwise return fallback
function getArg(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return fallback;
}
// Then:
const category = getArg("category", "mens-shirts");
const limit = Number(getArg("limit", "5"));
const currency = process.env.CURRENCY ?? "USD";

// STEP 9: Inside try/catch:
try {
    const apiProducts = await fetchProducts(category, limit);

    if (apiProducts.length === 0) {
        throw new Error(`No products found for category "${category}"`);
    }

    const catalog = apiProducts.map((p) => toCatalogProduct(p, currency));
    await mkdir("data", { recursive: true });
    await writeFile("data/catalog.json", JSON.stringify(catalog, null, 2));

    const inStockCount = catalog.filter((p) => p.inStock).length;
    const outOfStockCount = catalog.length - inStockCount;
    const totalInventoryValue = catalog.reduce((sum, p) => sum + p.price * p.inventory, 0).toFixed(2);

    console.log(`Imported ${catalog.length} products from "${category}" -> data/catalog.json`);
    console.log(`In stock: ${inStockCount} | Out of stock: ${outOfStockCount}`);
    console.log(`Total inventory value: ${totalInventoryValue} ${currency}`);
} catch (err) {
    console.error("Import failed:", (err as Error).message);
    process.exitCode = 1;
}

//   4. Print a summary, e.g.
//        Imported 5 products from "mens-shirts" -> data/catalog.json
//        In stock: 4 | Out of stock: 1
//        Total inventory value: 1234.50 USD
//      Hints:
//        catalog.filter((p) => p.inStock).length
//        catalog.reduce((sum, p) => sum + p.price * p.inventory, 0).toFixed(2)
// In catch: console.error("Import failed:", (err as Error).message) and process.exitCode = 1;

// STEP 10: Try it with different inputs:
//   --category tops --limit 3
//   --category womens-dresses --limit 10
//   --category notarealcategory        (what happens?)

