"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const empty = { name: "", email: "", password: "", confirm: "" };

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const showError = (msg: string) => {
    setError(msg);
    toast.error(msg);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name) return showError("আপনার নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return showError("সঠিক ইমেইল লিখুন");
    if (form.password.length < 8) return showError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (form.password !== form.confirm) return showError("দুইটা পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password: form.password });
    setLoading(false);

    if (error) {
      return showError(
        error.code?.includes("ALREADY_EXISTS")
          ? "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে"
          : "অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন"
      );
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন");
    router.push("/signin");
  };

  const fields = [
    { key: "name", label: "নাম", type: "text", placeholder: "যেমন: রহিম উদ্দিন", auto: "name" },
    { key: "email", label: "ইমেইল", type: "email", placeholder: "you@example.com", auto: "email" },
    { key: "password", label: "পাসওয়ার্ড", type: "password", placeholder: "কমপক্ষে ৮ অক্ষর", auto: "new-password" },
    { key: "confirm", label: "পাসওয়ার্ড নিশ্চিত করুন", type: "password", placeholder: "আবার লিখুন", auto: "new-password" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {fields.map((f) => (
        <label key={f.key} className="flex flex-col gap-1">
          <span className="text-sm font-medium">{f.label}</span>
          <input
            type={f.type}
            value={form[f.key]}
            onChange={update(f.key)}
            placeholder={f.placeholder}
            autoComplete={f.auto}
            className="input w-full rounded-lg border-base-300"
          />
        </label>
      ))}

      {error && <p className="text-sm text-error">{error}</p>}

      <button type="submit" disabled={loading} className="btn btn-primary btn-bazar font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        অ্যাকাউন্ট তৈরি করুন
      </button>

      <p className="text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
