import type { Product, SortType, Unit } from "./types";

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// 148 -> ১৪৮
export function toBn(value: number | string) {
  return String(value).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
}

// ১,৮৫০ -> 1850 (so sorting works on real number, not on text)
export function fromBn(value: string) {
  const en = value.replace(/[০-৯]/g, (d) => String(bnDigits.indexOf(d))).replace(/,/g, "");
  return Number(en);
}

// 1850 -> ১,৮৫০
export function bnPrice(value: number) {
  const hasFraction = !Number.isInteger(value);
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function bnPercent(pct: number) {
  return toBn(Math.abs(pct).toFixed(1));
}

const unitNames: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function unitBn(unit: Unit) {
  return unitNames[unit] ?? unit;
}

// "প্রতি কেজি"
export function perUnit(unit: Unit) {
  return `প্রতি ${unitBn(unit)}`;
}

// মঙ্গলবার, ৬ অক্টোবর, ২০২৬
export function bnDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

// price can come as number or as bangla text, always get a real number
function priceOf(p: Product) {
  const value: number | string = p.today;
  return typeof value === "number" ? value : fromBn(value);
}

export function sortProducts(list: Product[], sort: SortType) {
  if (sort === "default") return list;
  return [...list].sort((a, b) =>
    sort === "low" ? priceOf(a) - priceOf(b) : priceOf(b) - priceOf(a)
  );
}
