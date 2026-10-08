import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/session";
import UpdateNameForm from "@/components/UpdateNameForm";

export const metadata: Metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default async function UpdateProfilePage() {
  const { user } = await requireSession("/profile/update");

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl leading-8 font-bold">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm leading-5">প্রোফাইলে যে নাম দেখাবে সেটা এখানে বদলান।</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
        <UpdateNameForm currentName={user.name} />
      </div>

      <Link href="/profile" className="text-center text-sm hover:text-primary">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
