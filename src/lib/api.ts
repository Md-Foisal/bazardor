import type { Category, Product } from "./types";

// main api and a backup one (both from the assignment readme)
const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getJson<T>(path: string): Promise<T> {
  let lastError: unknown = null;

  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 600 } });
      if (res.ok) return (await res.json()) as T;
      lastError = new Error(`request failed ${res.status}`);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError;
}

export function getProducts() {
  return getJson<Product[]>("/products");
}

export function getProductsByCategory(slug: string) {
  return getJson<Product[]>(`/products?category=${encodeURIComponent(slug)}`);
}

export function getCategories() {
  return getJson<Category[]>("/categories");
}

// api gives single product only by id, so we find the slug from the list
export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}
