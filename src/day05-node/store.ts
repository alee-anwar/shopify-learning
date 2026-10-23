// Day 5 — this file holds FILE HELPERS (save / load products).

// STEP 2: Import what you need:
//   import { readFile, writeFile, mkdir } from "node:fs/promises";
//   import type { Product } from "./types.js";     <- note: .js, not .ts
import { readFile, writeFile, mkdir } from "node:fs/promises";
import type { Product } from "./types.js";     // <- note: .js, not .ts

// STEP 3: Write and EXPORT:
//   async function saveProducts(products: Product[]): Promise<void>
//     - create the "data" folder (mkdir with { recursive: true })
//     - write products to "data/products.json" using JSON.stringify(products, null, 2)
export async function saveProducts(products: Product[]): Promise<void> {
    await mkdir("data", { recursive: true });
    await writeFile("data/products.json", JSON.stringify(products, null, 2));
}

// STEP 4: Write and EXPORT:
//   async function loadProducts(): Promise<Product[]>
//     - read "data/products.json" as "utf-8"
//     - JSON.parse it and return it as Product[]
export async function loadProducts(): Promise<Product[]> {
    const data = await readFile("data/products.json", "utf-8");
    return JSON.parse(data) as Product[];
}
