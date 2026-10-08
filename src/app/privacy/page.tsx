import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "প্রাইভেসি পলিসি | বাজার দর" };

// simple privacy page, google login needs a public privacy link
export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-6 text-sm leading-6">
        <h1 className="text-2xl leading-8 font-bold">প্রাইভেসি পলিসি</h1>
        <p>
          বাজার দর একটি শিক্ষামূলক প্রজেক্ট। সাইন আপ বা Google/GitHub দিয়ে লগইন করলে আমরা শুধু আপনার নাম, ইমেইল
          আর প্রোফাইল ছবি রাখি, যাতে আপনি অ্যাকাউন্টে ঢুকতে পারেন এবং প্রোফাইল দেখতে পারেন।
        </p>
        <p>এই তথ্য কারো সাথে শেয়ার করা হয় না, বিক্রি করা হয় না, কোনো বিজ্ঞাপনেও ব্যবহার হয় না।</p>
        <p>অ্যাকাউন্ট মুছে ফেলতে চাইলে নিচের ইমেইলে জানালেই আপনার সব তথ্য মুছে দেওয়া হবে।</p>
        <p>
          যোগাযোগ: <a className="text-primary" href="mailto:mffoisal8@gmail.com">mffoisal8@gmail.com</a>
        </p>
        <Link href="/" className="btn btn-primary btn-bazar btn-sm sm:btn-md mt-2 w-fit">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
