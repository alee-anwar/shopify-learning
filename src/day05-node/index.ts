// Day 5 — ESM imports, dotenv, fs/promises
// Setup (once): npm install dotenv
// Run:          npx tsx src/day05-node/index.ts
// Check:        npm run typecheck
//
// Before running, create a file called `.env` in the PROJECT ROOT (next to package.json):
//   STORE_NAME=Ali Clothing
//   CURRENCY=USD
// (.env is already in .gitignore, so it will never be pushed to GitHub.)

// STEP 5: Load .env and import your own modules:
//   import "dotenv/config";
//   import type { Product } from "./types.js";
//   import { saveProducts, loadProducts } from "./store.js";
import "dotenv/config";
import type { Product } from "./types.js";
import { saveProducts, loadProducts } from "./store.js";

// STEP 6: Read STORE_NAME and CURRENCY from process.env.
// If STORE_NAME is missing -> throw new Error("Missing STORE_NAME in .env")
// If CURRENCY is missing   -> use "USD" as a fallback (hint: ??)
const storeName = process.env.STORE_NAME;
if (!storeName) {
    throw new Error("Missing STORE_NAME in .env");
}
const currency = process.env.CURRENCY ?? "USD";

// STEP 7: Create a products array (your 3 clothing products) and call saveProducts().
// Then open data/products.json in VS Code — your data is now in a file!
const products: Product[] = [
    {
        id: 1,
        title: "Hoodie",
        price: 40,
        sizes: ["S", "M", "L", "XL"],
        description: "A cozy hoodie for all seasons.",
    },
    {
        id: 2,
        title: "T-Shirt",
        price: 20,
        sizes: ["S", "M", "L", "XL"],
        description: "A comfortable t-shirt for everyday wear.",
    },
    {
        id: 3,
        title: "Jeans",
        price: 60,
        sizes: ["S", "M", "L", "XL"],
        description: "Stylish jeans with a perfect fit.",
    },
];

await saveProducts(products);

// STEP 8: Call loadProducts() and log each one like:
//   "[Ali Clothing] Hoodie - 40 USD"
loadProducts().then((loadedProducts) => {
    loadedProducts.forEach((product) => {
        console.log(`[${storeName}] ${product.title} - ${product.price} ${currency}`);
    });
})
.catch((error) => {
    console.error("Error loading products:", error);
});


// STEP 9: Wrap steps 7–8 in try/catch so any file error is logged nicely.
try {
    // Step 7: save
    await saveProducts(products);

    // Step 8: load and log
    const loadedProducts = await loadProducts();
    loadedProducts.forEach((product) => {
        console.log(`[${storeName}] ${product.title} - ${product.price} ${currency}`);
    });
} catch (error) {
    console.error("Error:", error); 
}

// BONUS:
//   - Delete data/products.json and call ONLY loadProducts(). What error do you get?
//     Make loadProducts() return [] if the file doesn't exist.
//     (hint: in catch, check (err as NodeJS.ErrnoException).code === "ENOENT")
//   - Write `addProduct(p: Product)` in store.ts: load, push, save.
