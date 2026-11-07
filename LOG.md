# Learning Log

Goal: Shopify Backend Developer (Node.js, TypeScript, Admin GraphQL API).
Format: 3–4 lines per day, in my own words. What I learned, what confused me, what I'd do differently.

---

## Week 1 — TypeScript & Node.js foundations

### Day 1 — Project setup

- Set up Node.js, VS Code, Git, and a TypeScript project with `tsconfig.json` and `tsx`.
- `-D` installs dev-only packages; `package-lock.json` pins exact versions.
- TypeScript 7 needs `"types": ["node"]` in tsconfig to know about Node's built-in modules.
- Confused by: <!-- write here -->

### Day 2 — Types, arrays, objects

- <!-- What does `?` on a field mean? When do I use `type` vs `interface`? -->
- `?` on a field means the field is optional. Before using it I need to no description, for example with `??` to give a backup value.
- `interface` is for describing the structure of an object, like `Product`.
- `type` can do that too, but it can also fixed list, like `Size = "S" | "M"`. An interface can't.
- My rule: interface for objects, type for everything else.
- `string[]` means array of string.

### Day 3 — Unions, narrowing, generics

- <!-- What is a discriminated union and why is `switch` useful with it? What does <T> do? -->

### Day 3 — Unions, narrowing, generics

- A union type means "one of these", e.g. `OrderStatus = "pending" | "paid"`.
- A discriminated union is a union of objects that all share one "label" field with a different fixed value (like `method: "card"` / `method: "paypal"`). Checking that field tells you which shape you have.
- Narrowing: after a check like `switch (p.method)` or `typeof id === "number"`, TypeScript knows the exact type, so I can only use the fields that really exist.
- `<T>` is a generic: a placeholder for a type that's filled in when the function is called. `firstItem<T>(list: T[])` works for any array and still keeps the real type. Better than `any`, which turns off type checking.

### Day 4 — Async

- <!-- Promise vs async/await. Why doesn't fetch throw on a 404? Promise.all result? -->

- A Promise is like a receipt: a value that isn't ready yet. It will either resolve (give the value) or reject (give an error).
- `async/await` is an easier way to write Promise code. `await` pauses only that function, while JavaScript (still single-threaded) does other work, like one waiter serving many tables.
- `fetch` doesn't throw on 404/500 because the server did answer. It only throws when there's no answer at all (no internet, wrong domain). So I must check `res.ok` myself.
- `Promise.all([...])` runs several Promises at the same time and returns an array of results in the same order. It's faster than awaiting one by one (~500ms vs ~1500ms). If one fails, the whole thing fails.
- `try/catch` around `await` handles errors.

### Day 5 — Node: ESM, dotenv, fs

- <!-- Why `.js` in imports? Why is `.env` in .gitignore? What does ENOENT mean? -->
- Code is split into files with `export` / `import`. Built-in modules use `node:`, e.g. `node:fs/promises`.
- Imports use `.js` (not `.ts`) because TypeScript compiles `.ts` → `.js`, Node only runs `.js`, and TypeScript doesn't rewrite import paths. I write the name the file will have when it runs.
- `.env` holds secrets (like API tokens) and is in `.gitignore` so it's never pushed. I read values with `process.env.NAME` and check they exist.
- `fs/promises` gives `readFile`, `writeFile`, `mkdir`. `JSON.stringify` saves objects as text; `JSON.parse` reads them back.
- ENOENT means "file doesn't exist". I can check `err.code === "ENOENT"` to handle a missing file, and re-throw any other error so real problems aren't hidden.

### Day 6 — Build: catalog importer CLI

- <!-- Why two types (ApiProduct vs CatalogProduct)? What bug did the empty category reveal? -->

I used two types because the API's data and store's data are different. `ApiProduct` is the shape API sends, and `CatalogProduct` is the shape my store uses.
The `transform` function is the only place that knows about both. If the API changes, I only need to change transform.ts.
In a real job the API would be something like a(n) ERPs, 3PLs, CRMs and the store would be shopify.
Bug: an unknown category returned status 200 with an empty list, so 'fetch' didn't throw. My script saved it and become my good catalog.
Fix: I check the data and saving. Lesson a "successful" response can still be bad data.

### Week 1 reflection

- Hardest thing: <!-- -->
- Most useful thing for the Shopify job: <!-- -->
- Next week I want to: <!-- -->

## Week 2 - GraphQL

### Day 8 - What GraphQL is, REST vs GraphQL

- REST: many URLs, the server picks the fields (dummyjson send 22, I needed 2 -> over-fetching).
- GraphQL: one URL, always POST, I pick the fields. The response has the same shape as my query.
- A bad GraphQL query still returns HTTP 200, with an `errors` array and no `data`. So I need two checks: `res.ok` and `json.errors`.
- Shopify prices are nested (`priceRange.minVariantPrice.amount`) because products have variants, and `amount` is a string.
