// Day 2 — Types, arrays, objects, type vs interface, optional fields
// Run:   npx tsx src/day02-types/index.ts
// Check: npm run typecheck

// STEP 1: Create a type `Size` that only allows "S", "M", "L" or "XL".
// Hint: use `type` and the | symbol.
type Size = "S" | "M" | "L" | "XL";

// STEP 2: Create an interface `Product` with:
//   id          -> number
//   title       -> string
//   price       -> number
//   sizes       -> an array of Size
//   description -> string, but OPTIONAL
interface Product {
    id: number;
    title: string;
    price: number;
    sizes: Size[];
    description?: string;
}

// STEP 3: Create `products`, an array of Product (Product[]) with 3 products.
// Make them realistic (clothing store) — we'll reuse them as your store catalog in Week 3.
// Leave `description` out of ONE product.
const products: Product[] = [
    {
        id: 1,
        title: "Hoodie",
        price: 40,
        sizes: ["S", "M", "L", "XL"],
        description: "Warm cotton hoodie"
    },
    {
        id: 2,
        title: "T-Shirt",
        price: 20,
        sizes: ["S", "M"],
        description: "Comfortable cotton t-shirt"
    },
    {
        id: 3,
        title: "Jeans",
        price: 60,
        sizes: ["M", "L", "XL"],
        description: "Stylish denim jeans"
    }
];

// STEP 4: Write a function `printProduct(p: Product): string` that returns e.g.
//   "Hoodie - $40 (S, M, L) | Warm cotton hoodie"
// If there's no description, show "No description" instead.
// Hint: .join(", ") for sizes, ?? for the fallback.
function printProduct(p: Product): string {
    const sizes = p.sizes.join(", ");
    const description = p.description ?? "No description";
    return `${p.title} - ${p.price} (${sizes}) | ${description}`;
}

// STEP 5: Loop over products and console.log(printProduct(...)) for each.
// Hint: for (const p of products) { ... }
for (const p of products) {
    console.log(printProduct(p));
}

// BONUS: Try breaking things on purpose and run `npm run typecheck`:
//   - give a product size "XXL"
//   - make price a string
//   - remove `title` from a product
// Read each error message, then fix it.
