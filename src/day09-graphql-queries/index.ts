// Week 2, Day 2 — Queries, fields, nested objects
// Run:   npx tsx src/day09-graphql-queries/index.ts
// Check: npm run typecheck

// STEP 1: Make your graphql() function reusable across days.
//   - Create a new file: src/shared/mockshop.ts
//   - Move your graphql() function from day08 into it (with BOTH checks: res.ok and json.errors)
//   - Put `export` in front of it
//   - Import it here:  import { graphql } from "../shared/mockshop.js";
// (Day 5 skill: export / import. From now on, every day uses this one function.)
import { graphql } from "../shared/mockshop.js"

// STEP 2: Get ONE product by handle: "hoodie"
// Ask for these SCALAR fields: title, handle, vendor, description, tags
// Print the result.
const result = await graphql(`
    query HoodieDetails {
        product(handle: "hoodie") {
            title
            handle
            vendor
            description
            tags
            options { name values }
            featuredImage { url altText }
            variants(first: 5) {
                edges {
                    node {
                        id
                        title
                        availableForSale
                        price { amount currencyCode }
                    }
                }
            }
        }
    }`);

// Print it. Then print ONE clean line per variant, e.g.
//   "Hoodie / Small — 60.0 CAD — available"
// Hint: result.data.product.variants.edges.map((e: any) => e.node)
const product = result.data.product;
const variants = product.variants.edges.map((e: any) => e.node);
console.log(Object.keys(result.data.product));

for (const v of variants) {
    const status = v.availableForSale ? "available" : "sold out";
    console.log(`${product.title} / ${v.title} — ${v.price.amount} ${v.price.currencyCode} — ${status}`);
}
// STEP 4: Name your query.  query HoodieDetails { ... }
// Does the result change? (Answer in LOG.md.)

// STEP 5: Use ALIASES to get two products in ONE request:
//   hoodie: product(handle: "hoodie") { title }
//   slides: product(handle: "slides") { title }
// Print both titles.
const step5 = await graphql(`
    query TwoProducts {
        hoodie: product(handle: "hoodie") { title }
        slides: product(handle: "slides") { title }
    }`);
console.log(step5.data.hoodie.title);
console.log(step5.data.slides.title);   

// STEP 6: Ask for a handle that does NOT exist: product(handle: "nope")
//   - Does graphql() throw? What is result.data.product?
//   - Write a check: if product is null -> console.log("Product not found")
const step6 = await graphql(`
    query ProductNotFound {
        product(handle: "nope") { title }
    }`);

if (step6.data.product === null) {
    console.log("Product not found");
}

// STEP 7: Deep nesting — collections and their products in one query:
//   collections(first: 3) -> edges -> node -> title, products(first: 3) -> edges -> node -> title
// Print like:
//   Men: Hoodie, Men's T-shirt, ...
//   Women: ...
const step7 = await graphql(`
    query CollectionsAndProducts {
        collections(first: 3) {
            edges {
                node {
                    title
                    products(first: 3) {
                        edges {
                            node { title }
                        }
                    }
                }
            }
        }
    }`);

for (const c of step7.data.collections.edges.map((e: any) => e.node)) {
    const productTitles = c.products.edges.map((e: any) => e.node.title).join(", ");
    console.log(`${c.title}: ${productTitles}`);
}

// BONUS:
//   - Remove the { } from priceRange (write just `priceRange`). Read the error. Put it back.
//   - Compare extensions.cost for Step 2 vs Step 7. Which is more "expensive"? Why?
console.log("Step 2 cost:", result.extensions.cost.requestedQueryCost);
console.log("Step 7 cost:", step7.extensions.cost.requestedQueryCost);
