import type { Market } from "@/lib/types";
import { bnPrice } from "@/lib/bn";

// api may give division in english, show it in bangla
const divisions: Record<string, string> = {
  dhaka: "ঢাকা",
  chattogram: "চট্টগ্রাম",
  chittagong: "চট্টগ্রাম",
  rajshahi: "রাজশাহী",
  khulna: "খুলনা",
  barishal: "বরিশাল",
  sylhet: "সিলেট",
  rangpur: "রংপুর",
  mymensingh: "ময়মনসিংহ",
};

const divisionBn = (name: string) => divisions[name.trim().toLowerCase()] ?? name;

export default function MarketTable({ markets }: { markets: Market[] }) {
  // cheap market first, like figma
  const rows = markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  return (
    <div className="overflow-x-auto rounded-2xl border border-base-300">
      <table className="table-zebra table min-w-[560px]">
        <thead>
          <tr className="text-sm">
            <th>বাজার</th>
            <th>বিভাগ</th>
            <th className="text-right">সর্বনিম্ন</th>
            <th className="text-right">সর্বাধিক</th>
            <th className="text-right">গড়</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr key={`${m.market}-${m.division}`}>
              <td>{m.market}</td>
              <td>{divisionBn(m.division)}</td>
              <td className="text-right whitespace-nowrap">{bnPrice(m.min)} টাকা</td>
              <td className="text-right whitespace-nowrap">{bnPrice(m.max)} টাকা</td>
              <td className="text-right font-bold whitespace-nowrap">{bnPrice(m.avg)} টাকা</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
