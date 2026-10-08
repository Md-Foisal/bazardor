"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// small messages that come with ?auth=... in the url (redirects, social login)
const notices: Record<string, { type: "success" | "error"; text: string }> = {
  required: { type: "error", text: "এই পেজ দেখতে আগে সাইন ইন করুন" },
  social: { type: "success", text: "সাইন ইন সফল হয়েছে, স্বাগতম!" },
  "social-error": { type: "error", text: "সোশ্যাল লগইন হয়নি, আবার চেষ্টা করুন" },
};

export default function AuthNotice() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const key = params.get("auth");

  useEffect(() => {
    if (!key || !notices[key]) return;
    const { type, text } = notices[key];
    // id stops the same toast showing twice
    toast[type](text, { id: `auth-${key}` });

    // remove ?auth from url so refresh dont show it again
    const rest = new URLSearchParams(params.toString());
    rest.delete("auth");
    const query = rest.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [key, params, pathname, router]);

  return null;
}
