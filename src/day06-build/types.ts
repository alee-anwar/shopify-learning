// Types for the catalog importer.
// Two shapes on purpose: what the API SENDS vs what OUR store USES.

// STEP 1: The raw shape from the API (only the fields we care about).
// Look at https://dummyjson.com/products/category/mens-shirts?limit=1 in your browser.
export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand?: string; // OPTIONAL — some products have none
}

export interface ApiResponse {
  products: ApiProduct[];
  total: number;
}


// STEP 2: OUR store's shape. Notice it's different from the API's.
export interface CatalogProduct {
  id: string;          // e.g. "dummy-12"  (we prefix ids so we know where they came from)
  title: string;
  price: number;
  currency: string;    // from .env (CURRENCY)
  inventory: number;   // API calls it "stock"
  inStock: boolean;    // true if inventory > 0
  vendor: string;      // API's "brand", or "Unknown" if missing
  category: string;
}
