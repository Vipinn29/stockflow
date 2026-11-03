
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#dce1eb] px-4 py-3.5 outline-none";

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-[#20283a] p-12 text-white lg:flex">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#7777df]">S</span>StockFlow</Link>
        <div className="max-w-md"><div className="mb-6 text-5xl text-[#9494ed]">“</div><p className="text-3xl font-semibold leading-tight">Clear visibility. Better decisions. Confident operations.</p></div>
        <p className="text-sm text-slate-400">Modern inventory management for growing teams.</p>
      </div>
      <div className="flex items-center justify-center bg-[#f7f8fc] p-6">
      <div className="w-full max-w-md rounded-3xl border border-white bg-white p-8 shadow-[0_24px_70px_-35px_rgba(32,40,58,.35)] sm:p-10">
        <Link href="/" className="mb-10 flex items-center gap-2 text-sm font-bold text-[#5b5bd6] lg:hidden"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#5b5bd6] text-white">S</span>StockFlow</Link>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

        <p className="mb-8 mt-2 text-gray-600">
          Login to your StockFlow account.
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className={inputClass}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#5b5bd6] py-3.5 font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-[#4b4bc0] disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      </div>
    </main>
  );
}
