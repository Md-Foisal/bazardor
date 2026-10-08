import Link from "next/link";
import type { Product } from "@/lib/types";
import { bnPrice, perUnit } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl">
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base leading-6 font-semibold group-hover:text-primary">
            {product.nameBn}
          </h3>
          <p className="text-xs leading-4">{perUnit(product.unit)}</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs leading-4">আজকের দাম</p>
          <p className="leading-7">
            <span className="text-xl font-bold">{bnPrice(product.today)}</span>{" "}
            <span className="text-sm font-medium">টাকা</span>
          </p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
