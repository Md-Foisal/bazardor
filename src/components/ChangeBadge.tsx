import type { Product } from "@/lib/types";
import { bnPercent } from "@/lib/bn";

type Props = {
  change: Product["change"];
  plain?: boolean; // ticker uses only colored text, no pill
  className?: string;
};

export default function ChangeBadge({ change, plain = false, className = "" }: Props) {
  const { dir, pct } = change;

  let color = "text-flat";
  let arrow = "—";
  if (dir === "up") {
    color = "text-success";
    arrow = "▲";
  } else if (dir === "down") {
    color = "text-error";
    arrow = "▼";
  }

  const text = dir === "flat" ? `${arrow}০.০%` : `${arrow} ${bnPercent(pct)}%`;

  if (plain) {
    return <span className={`font-semibold ${color} ${className}`}>{text}</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xl bg-base-200 px-2 py-1 text-xs leading-4 font-semibold whitespace-nowrap ${color} ${className}`}
    >
      {text}
    </span>
  );
}
