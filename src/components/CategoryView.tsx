"use client";

import { useState } from "react";
import type { SortType } from "@/lib/types";
import { getCategories, getProductsByCategory } from "@/lib/api";
import { sortProducts, toBn } from "@/lib/bn";
import { useApiData } from "@/lib/useApiData";
import ProductCard from "./ProductCard";
import SortSelect from "./SortSelect";
import { GridSkeleton } from "./Skeletons";

export default function CategoryView({ slug }: { slug: string }) {
  const [sort, setSort] = useState<SortType>("default");
  const cats = useApiData("categories", getCategories);
  const items = useApiData(`products-${slug}`, () => getProductsByCategory(slug));

  const category = cats.data?.find((c) => c.slug === slug);
  const loading = cats.loading || items.loading;

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
          <div className="skeleton size-10 rounded-xl" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-6 w-24" />
            <div className="skeleton h-3 w-48" />
          </div>
        </div>
        <p className="flex items-center gap-2 text-sm">
          <span className="loading loading-spinner loading-xs text-primary" /> Loading…
        </p>
        <GridSkeleton count={6} />
      </div>
    );
  }

  if (cats.error || items.error) {
    return (
      <div role="alert" className="alert alert-error alert-soft">
        <span>দাম লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</span>
      </div>
    );
  }

  const products = items.data ?? [];

  if (!category || products.length === 0) {
    return (
      <div className="rounded-2xl border border-base-300 bg-base-100 p-10 text-center">
        <p className="font-semibold">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</p>
      </div>
    );
  }

  const list = sortProducts(products, sort);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl leading-10">{category.icon}</span>
        <div>
          <h1 className="text-2xl leading-8 font-bold">{category.nameBn}</h1>
          <p className="text-sm leading-5">{toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end rounded-2xl border border-base-300 bg-base-100 px-4 py-4">
          <SortSelect value={sort} onChange={setSort} />
        </div>
        <p className="text-sm leading-5">মোট {toBn(list.length)}টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
