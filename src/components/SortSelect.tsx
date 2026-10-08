"use client";

import type { SortType } from "@/lib/types";

type Props = {
  value: SortType;
  onChange: (value: SortType) => void;
};

export default function SortSelect({ value, onChange }: Props) {
  return (
    <label className="flex shrink-0 items-center gap-2 text-sm">
      <span>সাজান</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortType)}
        className="select select-sm w-auto rounded-lg border-base-300 bg-base-100 text-xs"
        aria-label="দাম অনুযায়ী সাজান"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low">দাম: কম থেকে বেশি</option>
        <option value="high">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}
