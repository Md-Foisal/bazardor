"use client";

import { getProducts } from "@/lib/api";
import { useApiData } from "@/lib/useApiData";
import AllProducts from "./AllProducts";
import PriceMovers from "./PriceMovers";

export default function HomeProducts() {
  const { data: products, error } = useApiData("products", getProducts);

  if (error) {
    return (
      <div role="alert" className="alert alert-error alert-soft">
        <span>দাম লোড করা যায়নি। একটু পরে পেজটা রিফ্রেশ করুন।</span>
      </div>
    );
  }

  return (
    <>
      <PriceMovers type="up" products={products} />
      <PriceMovers type="down" products={products} />
      <AllProducts products={products} />
    </>
  );
}
