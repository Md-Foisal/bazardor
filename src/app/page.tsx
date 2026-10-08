import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />
      <HomeProducts />
    </div>
  );
}
