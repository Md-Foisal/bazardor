"use client";

import { useMemo, useState } from "react";
import type { Product, SortType } from "@/lib/types";
import { CATEGORIES } from "@/lib/categories";
import { sortProducts, toBn } from "@/lib/bn";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";
import { GridSkeleton } from "./Skeletons";

export default function AllProducts({ products }: { products: Product[] | null }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortType>("default");

  const list = useMemo(() => {
    if (!products) return [];
    const text = search.trim().toLowerCase();
    const filtered = products.filter((p) => {
      const matchCat = category === "all" || p.category === category;
      const matchText = !text || p.nameBn.includes(text) || p.slug.includes(text);
      return matchCat && matchText;
    });
    return sortProducts(filtered, sort);
  }, [products, search, category, sort]);

  const chip = (active: boolean) =>
    `btn btn-xs h-6 min-h-6 rounded-xl px-2.5 font-medium ${active ? "btn-primary" : "btn-ghost bg-base-200"}`;

  return (
    <section id="সব-পণ্য" className="flex scroll-mt-6 flex-col gap-3">
      <h2 className="text-xl leading-7 font-bold">সব পণ্য</h2>

      <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 lg:flex-row lg:items-center">
        <label className="input input-sm h-10 w-full rounded-lg border-base-300 lg:w-56">
          <span>🔍</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="পণ্যের নাম লিখুন…"
          />
        </label>

        <div className="flex flex-wrap gap-1.5">
          <button type="button" className={chip(category === "all")} onClick={() => setCategory("all")}>
            সব
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={chip(category === c.slug)}
              onClick={() => setCategory(c.slug)}
            >
              {c.icon} {c.nameBn}
            </button>
          ))}
        </div>

        <div className="lg:ml-auto">
          <SortSelect value={sort} onChange={setSort} />
        </div>
      </div>

      {products ? (
        <>
          <p className="text-sm leading-5">মোট {toBn(list.length)}টি পণ্য দেখানো হচ্ছে</p>
          {list.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center">
              <p className="text-3xl">🧺</p>
              <p className="mt-2 font-semibold">এই নামে কোনো পণ্য পাওয়া যায়নি</p>
            </div>
          )}
        </>
      ) : (
        <>
          <p className="flex items-center gap-2 text-sm">
            <span className="loading loading-spinner loading-xs text-primary" /> Loading…
          </p>
          <GridSkeleton count={9} />
        </>
      )}
    </section>
  );
}
