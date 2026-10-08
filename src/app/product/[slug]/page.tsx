import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { requireSession } from "@/lib/session";
import { bnPrice, unitBn, perUnit } from "@/lib/bn";
import ChangeBadge from "@/components/ChangeBadge";

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return { title: product ? `${product.nameBn} এর আজকের দাম | বাজার দর` : "পণ্য | বাজার দর" };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const diff = product.today - product.yesterday;
  const unit = unitBn(product.unit);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="breadcrumbs py-0 text-sm">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link>
          </li>
          <li>{product.nameBn}</li>
        </ul>
      </div>

      {/* top summary */}
      <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 md:flex-row md:items-center">
        <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl">
          {product.image}
        </span>

        <div className="flex-1">
          <h1 className="text-2xl leading-9 font-bold sm:text-3xl">{product.nameBn}</h1>
          <p className="text-sm leading-5">
            {perUnit(product.unit)} · {product.categoryNameBn}
          </p>
          <p className="mt-2 text-sm leading-5">
            {diff === 0 ? (
              <>গতকালের তুলনায় আজ দাম <b>অপরিবর্তিত</b></>
            ) : (
              <>
                গতকালের তুলনায় আজ দাম <b>{diff > 0 ? "বেড়েছে" : "কমেছে"}</b> · {bnPrice(Math.abs(diff))} টাকা
              </>
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href={`/category/${product.category}`} className="badge badge-soft badge-primary">
              {product.categoryIcon} {product.categoryNameBn}
            </Link>
            <span className="badge badge-ghost">{perUnit(product.unit)}</span>
          </div>
        </div>

        <div className="flex min-w-32 flex-col items-center rounded-2xl bg-base-200 px-5 py-4 text-center">
          <p className="text-sm">আজকের দাম</p>
          <p className="text-3xl leading-9 font-bold">{bnPrice(product.today)}</p>
          <p className="text-sm">টাকা / {unit}</p>
          <ChangeBadge change={product.change} plain className="mt-1 text-sm" />
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href="/" className="btn btn-outline btn-sm sm:btn-md border-base-300 bg-base-100">
          ← সব পণ্য
        </Link>
        <Link href={`/category/${product.category}`} className="btn btn-primary btn-bazar btn-sm sm:btn-md">
          {product.categoryIcon} আরও {product.categoryNameBn} দেখুন
        </Link>
      </div>
    </div>
  );
}

