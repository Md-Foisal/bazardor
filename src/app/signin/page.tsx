import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import SignInForm from "@/components/auth/SignInForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন | বাজার দর" };

export default async function SignInPage() {
  // already logged in, nothing to do here
  if (await getSession()) redirect("/");

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <Suspense fallback={<FormSkeleton />}>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="skeleton h-16 w-full" />
      <div className="skeleton h-16 w-full" />
      <div className="skeleton h-10 w-full" />
    </div>
  );
}
