import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { GridSkeleton } from "./Skeletons";

type Props = {
  type: "up" | "down";
  products: Product[] | null;
};

// top 6 risers or fallers of today
export function pickMovers(products: Product[], type: "up" | "down") {
  return products
    .filter((p) => p.change.dir === type)
    .sort((a, b) => (type === "up" ? b.change.pct - a.change.pct : a.change.pct - b.change.pct))
    .slice(0, 6);
}

export default function PriceMovers({ type, products }: Props) {
  const isUp = type === "up";

  return (
    <section className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-xl leading-7 font-bold">
        <span className={`text-base ${isUp ? "text-success" : "text-error"}`}>{isUp ? "▲" : "▼"}</span>
        {isUp ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}
      </h2>

      {products ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pickMovers(products, type).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <GridSkeleton count={6} />
      )}
    </section>
  );
}
