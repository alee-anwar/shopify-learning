// Day 4 — Promises, async/await, try/catch, fetch
// Run:   npx tsx src/day04-async/index.ts
// Check: npm run typecheck

// ---------- PART A: Promises & await (fake "slow" store data) ----------

// STEP 1: Write `wait(ms: number): Promise<void>` that resolves after `ms` milliseconds.
// Hint: new Promise((resolve) => setTimeout(resolve, ms))
function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// STEP 2: Create an interface `Order` { id: number; customer: string; total: number }
// Then write `async function fetchOrder(id: number): Promise<Order>` that:
//   - waits 500ms (use wait)
//   - if id is 0 or negative -> throw new Error("Invalid order id")
//   - otherwise returns a fake order, e.g. { id, customer: "Ali", total: 40 }
interface Order {
    id: number;
    customer: string;
    total: number;
}

async function fetchOrder(id: number): Promise<Order> {
    await wait(500);
    if (id <= 0) {
        throw new Error("Invalid order id");
    }
    return { id, customer: "Ali", total: 40 };
}

// STEP 3: Call fetchOrder(1) with await and log the result.
// Then call fetchOrder(-1) inside try/catch and log the error message.
// Hint: in catch, use (err as Error).message
fetchOrder(1)
    .then((order) => console.log("Order fetched:", order))
    .catch((err) => console.error("Error fetching order:", (err as Error).message));

// ---------- PART B: Real API with fetch ----------
// We'll use a free practice API: https://dummyjson.com/products?limit=5

// STEP 4: Create an interface `ApiProduct` with: id, title, price, stock
// And `ProductsResponse` with: products (ApiProduct[]), total (number)
interface ApiProduct {
    id: number;
    title: string;
    price: number;
    stock: number;
}

interface ProductsResponse {
    products: ApiProduct[];
    total: number;
}

// STEP 5: Write `async function getProducts(limit: number): Promise<ApiProduct[]>` that:
//   - fetches `https://dummyjson.com/products?limit=${limit}`
//   - if !res.ok -> throw new Error(`HTTP ${res.status}`)
//   - reads the JSON as ProductsResponse and returns .products
async function getProducts(limit: number): Promise<ApiProduct[]> {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    const data: ProductsResponse = await res.json();
    return data.products;
}

// STEP 6: Call getProducts(5) inside try/catch and log each product like:
//   "Essence Mascara - $9.99 (stock: 99)"

// getProducts(5)
//     .then((products) => {
//         for (const product of products) {
//             console.log(`${product.title} - $${product.price} (stock: ${product.stock})`);
//         }
//     })
//     .catch((err) => console.error("Error fetching products:", (err as Error).message));

try {
    const products = await getProducts(5);
    for (const product of products) {
        console.log(`${product.title} - $${product.price} (stock: ${product.stock})`);
    }
}
catch (err) {
    console.error("Error fetching products:", (err as Error).message);
}
// STEP 7: Break it on purpose: change the URL to https://dummyjson.com/productsXYZ
// What happens? Does your `res.ok` check catch it? Change it back after.   


// BONUS:
//   - Fetch products 1, 2 and 3 at the SAME TIME with Promise.all:
//       const results = await Promise.all([fetchOrder(1), fetchOrder(2), fetchOrder(3)]);
//     Time it with console.time("all") / console.timeEnd("all").
//     Compare to awaiting them one by one. Which is faster, and why?

console.time("all");

const results = await Promise.all([fetchOrder(1), fetchOrder(2), fetchOrder(3)]);
for (const order of results) {
    console.log("Order fetched:", order);
}
console.timeEnd("all");
