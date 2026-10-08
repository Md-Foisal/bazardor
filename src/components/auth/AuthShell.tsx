import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <div className="text-center">
        <h1 className="text-2xl leading-8 font-bold">{title}</h1>
        <p className="mt-1 text-sm leading-5">{subtitle}</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">{children}</div>

      <Link href="/" className="text-center text-sm hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
