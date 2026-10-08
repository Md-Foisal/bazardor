"use client";

import Link from "next/link";
import { getProducts } from "@/lib/api";
import { bnPrice, unitBn } from "@/lib/bn";
import { useApiData } from "@/lib/useApiData";
import ChangeBadge from "./ChangeBadge";

export default function Ticker() {
  const { data: products, loading } = useApiData("products", getProducts);

  if (loading || !products) {
    return (
      <div className="border-b border-base-300 bg-base-100 px-4 py-2">
        <div className="skeleton h-5 w-full" />
      </div>
    );
  }

  // list printed two times for a seamless loop
  const items = [...products, ...products];

  return (
    <div className="ticker-wrap overflow-hidden border-b border-base-300 bg-base-100" aria-label="আজকের দাম">
      <div className="ticker-track flex w-max">
        {items.map((p, i) => (
          <Link
            key={`${p.id}-${i}`}
            href={`/product/${p.slug}`}
            aria-hidden={i >= products.length}
            tabIndex={i >= products.length ? -1 : undefined}
            className="flex shrink-0 items-center gap-1.5 border-r border-base-200 px-4 py-2 text-sm leading-5 whitespace-nowrap hover:bg-base-200"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span>
              {bnPrice(p.today)} টাকা/{unitBn(p.unit)}
            </span>
            <ChangeBadge change={p.change} plain />
          </Link>
        ))}
      </div>
    </div>
  );
}
