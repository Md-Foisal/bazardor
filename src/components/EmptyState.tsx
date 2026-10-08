import Link from "next/link";

type Props = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।",
}: Props) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-3 rounded-3xl border border-base-300 bg-base-100 px-6 py-12 text-center">
      <span className="text-5xl">🧺</span>
      <p className="text-6xl leading-none font-bold text-primary">৪০৪</p>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm opacity-80">{message}</p>
      <Link href="/" className="btn btn-primary btn-bazar btn-sm sm:btn-md mt-2 font-semibold">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
