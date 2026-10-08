import type { Product } from "@/lib/types";
import { toBn } from "@/lib/bn";
import ProductCard from "./ProductCard";

export default function AllProducts({ products }: { products: Product[] | null }) {
  return (
    <section id="সব-পণ্য" className="flex scroll-mt-6 flex-col gap-3">
      <h2 className="text-xl leading-7 font-bold">সব পণ্য</h2>

      {products ? (
        <>
          <p className="text-sm leading-5">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm">Loading…</p>
      )}
    </section>
  );
}
