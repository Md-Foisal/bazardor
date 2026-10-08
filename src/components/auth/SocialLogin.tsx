"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

// after social login user goes to home (or the page he wanted before)
export default function SocialLogin({ next = "/" }: { next?: string }) {
  const [loading, setLoading] = useState<Provider | null>(null);

  const withNotice = (path: string, value: string) =>
    `${path}${path.includes("?") ? "&" : "?"}auth=${value}`;

  const login = async (provider: Provider) => {
    setLoading(provider);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: withNotice(next, "social"),
      errorCallbackURL: withNotice("/signin", "social-error"),
    });
    if (error) {
      toast.error("সোশ্যাল লগইন শুরু করা যায়নি");
      setLoading(null);
    }
  };

  return (
    <>
      <div className="divider my-0 text-xs">অথবা</div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => login("google")}
          disabled={loading !== null}
          className="btn btn-outline gap-1.5 border-base-300 bg-base-100 px-2 font-semibold whitespace-nowrap"
        >
          {loading === "google" ? <span className="loading loading-spinner loading-xs" /> : <FcGoogle />}
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          onClick={() => login("github")}
          disabled={loading !== null}
          className="btn btn-outline gap-1.5 border-base-300 bg-base-100 px-2 font-semibold whitespace-nowrap"
        >
          {loading === "github" ? <span className="loading loading-spinner loading-xs" /> : <FaGithub />}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}
