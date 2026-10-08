"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-3xl border border-base-300 bg-base-100 px-6 py-12 text-center">
        <span className="text-5xl">⚠️</span>
        <h1 className="text-2xl font-bold">কিছু একটা সমস্যা হয়েছে</h1>
        <p className="text-sm opacity-80">দাম লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={reset} className="btn btn-primary btn-bazar btn-sm sm:btn-md">
            আবার চেষ্টা করুন
          </button>
          <Link href="/" className="btn btn-outline btn-sm sm:btn-md border-base-300">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
