// Talks to the external API. Nothing else.

// STEP 3: 
import type { ApiProduct, ApiResponse } from "./types.js";


// STEP 4: export async function fetchProducts(category: string, limit: number): Promise<ApiProduct[]>
//   - URL: `https://dummyjson.com/products/category/${category}?limit=${limit}`
//   - if !res.ok -> throw new Error(`API error: HTTP ${res.status}`)
//   - read JSON as ApiResponse, return .products
//   (You wrote almost exactly this on Day 4.)

export async function fetchProducts(category: string, limit: number): Promise<ApiProduct[]> {
  const url = `https://dummyjson.com/products/category/${category}?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: HTTP ${res.status}`);
  }
  const data: ApiResponse = await res.json();
  return data.products;
}
