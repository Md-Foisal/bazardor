import type { Metadata } from "next";
import CategoryView from "@/components/CategoryView";
import { CATEGORIES } from "@/lib/categories";

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return { title: cat ? `${cat.nameBn} এর দাম | বাজার দর` : "ক্যাটাগরি | বাজার দর" };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* key so sort resets when user change category */}
      <CategoryView key={slug} slug={slug} />
    </div>
  );
}
