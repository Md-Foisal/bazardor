"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

// only allow our own paths in ?next=, not other sites
function safeNext(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const showError = (msg: string) => {
    setError(msg);
    toast.error(msg);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) return showError("ইমেইল আর পাসওয়ার্ড দুটোই লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return showError("সঠিক ইমেইল লিখুন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      return showError(
        error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে"
          : "সাইন ইন করা যায়নি, আবার চেষ্টা করুন"
      );
    }

    toast.success("সাইন ইন সফল হয়েছে, স্বাগতম!");
    router.push(next);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">ইমেইল</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="input w-full rounded-lg border-base-300"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">পাসওয়ার্ড</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="কমপক্ষে ৮ অক্ষর"
          autoComplete="current-password"
          className="input w-full rounded-lg border-base-300"
        />
      </label>

      {error && <p className="text-sm text-error">{error}</p>}

      <button type="submit" disabled={loading} className="btn btn-primary btn-bazar font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        সাইন ইন
      </button>

      <p className="text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
