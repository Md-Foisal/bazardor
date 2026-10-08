"use client";

import { useSyncExternalStore } from "react";
import { bnDate } from "@/lib/bn";

const noop = () => () => {};

// date is made on the browser, otherwise the static page keeps the build day
export default function BanglaDate({ className = "" }: { className?: string }) {
  const today = useSyncExternalStore(noop, () => bnDate(), () => "");

  return (
    <span className={className} suppressHydrationWarning>
      {today || " "}
    </span>
  );
}
