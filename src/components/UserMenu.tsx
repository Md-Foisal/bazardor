"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

type Props = {
  user: { name: string; email: string; image?: string | null };
};

export default function UserMenu({ user }: Props) {
  const router = useRouter();
  const firstName = user.name.split(" ")[0];

  const closeMenu = () => {
    (document.activeElement as HTMLElement | null)?.blur();
  };

  const handleSignOut = async () => {
    closeMenu();
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm sm:btn-md gap-2 px-2 sm:px-4">
        <Avatar name={user.name} image={user.image} size="size-8 sm:size-9" />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{firstName}</span>
        <span className="text-xs opacity-60">▾</span>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-2 w-60 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <div className="px-3 py-2">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs opacity-70">{user.email}</p>
        </div>
        <ul className="menu w-full p-0">
          <li>
            <Link href="/profile" onClick={closeMenu}>
              👤 আমার প্রোফাইল
            </Link>
          </li>
          <li>
            <button type="button" onClick={handleSignOut} className="text-error">
              ↩ সাইন আউট
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
