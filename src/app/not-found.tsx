import type { Metadata } from "next";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "পেজ পাওয়া যায়নি | বাজার দর",
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <EmptyState />
    </div>
  );
}
