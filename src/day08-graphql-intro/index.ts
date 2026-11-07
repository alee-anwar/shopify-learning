// Week 2, Day 1 — What GraphQL is, REST vs GraphQL
// Run:   npx tsx src/day08-graphql-intro/index.ts
// Check: npm run typecheck
//
// mock.shop = Shopify's free public demo store. No account or token needed.
// Endpoint: https://mock.shop/api  (ONE url for everything, always POST)

// ---------- PART A: REST (what you already know) ----------

// STEP 1: Fetch ONE product from dummyjson (REST):
//   https://dummyjson.com/products/1
// Log how many fields came back:  Object.keys(data).length
// (You'll probably only need title and price. How many did you get?)
const data = await fetch("https://dummyjson.com/products/1").then((res) => res.json());
console.log("STEP 1: REST product fields:", Object.keys(data).length);

// ---------- PART B: Your first GraphQL request ----------

// STEP 2: Write `async function graphql(query: string): Promise<unknown>` that:
//   - POSTs to https://mock.shop/api
//   - headers: { "Content-Type": "application/json" }
//   - body: JSON.stringify({ query })
//   - if !res.ok -> throw new Error(`HTTP ${res.status}`)
//   - returns the parsed JSON
// (Same fetch you know, just method: "POST" and a body.)
async function graphql(query: string): Promise<any> {
    const res = await fetch("https://mock.shop/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

// STEP 3: Ask for the first 3 products, ONLY id and title:
//   {
//     products(first: 3) {
//       edges { node { id title } }
//     }
//   }
// Log the result with: console.log(JSON.stringify(result, null, 2))
// Compare: how many fields per product now, vs Step 1?
const result = await graphql(`
    {
        products(first: 3) {
            edges {
                node {
                    id,
                    title
                }
            }
        }
    }`
);

console.log(JSON.stringify(result.data, null, 2));

// STEP 4: Change the query to ALSO get the price. Add this inside node { }:
//   priceRange { minVariantPrice { amount currencyCode } }
// Run again. Notice the response shape matches your query shape exactly.
const result2 = await graphql(`
    {
        products(first: 3) {
            edges {
                node {
                    id
                    title
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    }`
);

console.log(JSON.stringify(result2.data, null, 2));

// STEP 5: Break the query on purpose — ask for a field that doesn't exist:
//   edges { node { id title colour } }
// Run it. Questions to answer in LOG.md:
//   - What was the HTTP status? Did your `res.ok` check catch it?
//   - Where did the error message appear in the JSON?
const broken = await graphql(`{ products(first: 1) { edges { node { id title colour } } } }`);
console.log(JSON.stringify(broken, null, 2));



// BONUS:
//   - Look at `extensions.cost` in the response. Change first: 3 to first: 20.
//     Does the cost change? (This is how Shopify rate-limits — Week 4.)
//   - Try asking for `collections(first: 3) { edges { node { title } } }`
//     in the SAME query as products. One request, two kinds of data.
