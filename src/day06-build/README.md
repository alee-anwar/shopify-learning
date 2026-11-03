# Catalog Importer CLI

A small command-line tool that imports products from an external API, converts them into a store's own product format, and saves them to a JSON file.

It's a simplified version of a common e-commerce integration task: pulling a supplier's catalog into a store, where the supplier's data never matches the store's format exactly.

## What it does

```
External API  ──fetch──▶  ApiProduct[]  ──transform──▶  CatalogProduct[]  ──save──▶  data/catalog.json
```

1. **Fetch** products for a category from [DummyJSON](https://dummyjson.com) (standing in for a supplier API).
2. **Validate** the response, rejecting a failed request or an empty result.
3. **Transform** each product into the store's format.
4. **Save** the result to `data/catalog.json`.
5. **Print** a summary: products imported, stock status, total inventory value.

## Usage

```bash
npm install
npx tsx src/day06-build/index.ts --category mens-shirts --limit 5
```

| Option | Default | Description |
|---|---|---|
| `--category` | `mens-shirts` | Product category to import |
| `--limit` | `5` | Maximum number of products |

The currency comes from `CURRENCY` in `.env` (defaults to `USD`).

### Example output

```
Imported 5 products from "mens-shirts" -> data/catalog.json
In stock: 5 | Out of stock: 0
Total inventory value: 8956.93 USD
```

```
Import failed: No products found for category "notarealcategory"
```

## Project structure

| File | Responsibility |
|---|---|
| `types.ts` | `ApiProduct` (what the API sends) and `CatalogProduct` (what the store uses) |
| `api.ts` | Calls the external API. Nothing else. |
| `transform.ts` | Pure function that maps `ApiProduct` → `CatalogProduct` |
| `index.ts` | Reads CLI options, runs the steps in order, handles errors |

## Design decisions

- **Separate types for "their data" and "our data".** The API's field names (`stock`, `brand`) differ from the store's (`inventory`, `vendor`). One `transform` function is the only place that knows about both, so if the API changes, only that file changes.
- **Source-prefixed IDs.** IDs become `dummy-12` instead of `12`, so it's always clear where a record came from when several sources are combined.
- **Validate before saving.** An unknown category returns HTTP 200 with an empty list rather than an error. Without a check, the script would overwrite a good catalog with `[]`. It now fails cleanly and leaves the existing file untouched.
- **Correct exit codes.** On failure the script sets exit code `1`, so it can be used safely in automation (for example CI or a scheduled job).

## What I'd add next

- Retry with backoff when the API is temporarily unavailable
- Merge with the existing catalog instead of replacing it
- Push the products to a Shopify store via the Admin GraphQL API (Week 5 of my learning plan)

## Tech

TypeScript (strict mode), Node.js built-in `fetch` and `fs/promises`, `dotenv`, `tsx`.
