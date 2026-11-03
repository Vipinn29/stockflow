
"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-xl border border-[#e3e7ef] px-4 py-3 text-sm font-semibold text-[#667085] hover:bg-[#f7f8fb] hover:text-[#344054]"
    >
      Logout
    </button>
  );
}
