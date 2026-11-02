// Converts API data into OUR store's format. Pure function: no fetch, no files.

// STEP 5: 
import type { ApiProduct, CatalogProduct } from "./types.js";


// STEP 6: export function toCatalogProduct(p: ApiProduct, currency: string): CatalogProduct
//   Return an object where:
//     id        -> `dummy-${p.id}`
//     title     -> p.title
//     price     -> p.price
//     currency  -> currency
//     inventory -> p.stock
//     inStock   -> p.stock > 0
//     vendor    -> p.brand, or "Unknown" if missing   (hint: ??)
//     category  -> p.category

export function toCatalogProduct(p: ApiProduct, currency: string): CatalogProduct {
  return {
    id: `dummy-${p.id}`,
    title: p.title,
    price: p.price,
    currency: currency,
    inventory: p.stock,
    inStock: p.stock > 0,
    vendor: p.brand ?? "Unknown",
    category: p.category
  };
}
