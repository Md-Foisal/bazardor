"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = name.trim();

    if (value.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }
    if (value === currentName) {
      toast("নামে কোনো পরিবর্তন নেই", { icon: "ℹ️" });
      return;
    }

    setLoading(true);
    // better-auth docs: authClient.updateUser({ name })
    const { error } = await authClient.updateUser({ name: value });
    setLoading(false);

    if (error) {
      toast.error("আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("আপনার তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">নাম</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          autoComplete="name"
          className="input w-full rounded-lg border-base-300"
        />
      </label>

      <button type="submit" disabled={loading} className="btn btn-primary btn-bazar font-semibold">
        {loading && <span className="loading loading-spinner loading-sm" />}
        Update Information
      </button>
    </form>
  );
}
