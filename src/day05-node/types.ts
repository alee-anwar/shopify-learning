// Day 5 — this file holds the TYPES. Other files import from here.

// STEP 1: Move your Product type here and EXPORT it.
// Copy `Size` and `Product` from day02-types/index.ts and put `export` in front of each.
//   export type Size = ...
//   export interface Product { ... }

export type Size = "S" | "M" | "L" | "XL";

export interface Product {
    id: number;
    title: string;
    price: number;
    sizes: Size[];
    description?: string;
}

export const STORE_CURRENCY = "USD";
