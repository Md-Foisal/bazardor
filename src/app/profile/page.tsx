import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/session";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const { user } = await requireSession("/profile");

  const joined = new Intl.DateTimeFormat("bn-BD", { dateStyle: "long", timeZone: "Asia/Dhaka" }).format(
    new Date(user.createdAt)
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <div>
        <h1 className="text-2xl leading-8 font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm leading-5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 sm:flex-row sm:items-center">
        <Avatar name={user.name} image={user.image} size="size-20" text="text-3xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl leading-7 font-semibold">{user.name}</p>
          <p className="truncate text-base opacity-80">{user.email}</p>
        </div>
        <SignOutButton />
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-xl leading-7 font-bold">তথ্য</h2>
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Info label="নাম" value={user.name} />
          <Info label="ইমেইল" value={user.email} />
          <Info label="অ্যাকাউন্ট খোলা হয়েছে" value={joined} />
        </dl>
        <Link href="/profile/update" className="btn btn-primary btn-bazar w-full font-semibold">
          আপডেট
        </Link>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-base-300 px-4 py-3">
      <dt className="text-xs opacity-70">{label}</dt>
      <dd className="truncate text-sm font-medium">{value}</dd>
    </div>
  );
}
