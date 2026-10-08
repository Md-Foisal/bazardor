"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/categories";
import { authClient } from "@/lib/auth-client";
import BanglaDate from "./BanglaDate";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

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
          {isPending ? (
            <div className="skeleton h-9 w-28 sm:h-10 sm:w-40" />
          ) : session ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md font-semibold">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-primary btn-bazar btn-sm sm:btn-md font-semibold">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-base-200" aria-label="ক্যাটাগরি">
        <ul className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2">
          {CATEGORIES.map((cat) => {
            const href = `/category/${cat.slug}`;
            const active = pathname === href;
            return (
              <li key={cat.slug} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`btn btn-sm h-8 min-h-8 gap-1.5 rounded-lg px-3 text-xs font-semibold ${
                    active ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
