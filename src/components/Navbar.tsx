"use client";

import Link from "next/link";
import BanglaDate from "./BanglaDate";

export default function Navbar() {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-lg">
            🛒
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-xl leading-7 font-bold tracking-[-0.5px]">বাজার দর</span>
            <BanglaDate className="truncate text-xs leading-4" />
          </span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md font-semibold">
            সাইন ইন
          </Link>
          <Link href="/signup" className="btn btn-primary btn-bazar btn-sm sm:btn-md font-semibold">
            সাইন আপ
          </Link>
        </div>
      </div>
    </header>
  );
}
