
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    organizationName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      router.push("/login");
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
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fc] p-6">
      <div className="w-full max-w-md rounded-3xl border border-white bg-white p-8 shadow-[0_24px_70px_-35px_rgba(32,40,58,.35)] sm:p-10">
        <Link href="/" className="mb-10 flex items-center gap-2 text-sm font-bold text-[#5b5bd6]"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#5b5bd6] text-white">S</span>StockFlow</Link>
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

        <p className="mb-8 mt-2 text-gray-600">
          Start managing your inventory with StockFlow.
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Organization Name</label>
            <input
              name="organizationName"
              value={form.organizationName}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your organization"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              className={inputClass}
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              className={inputClass}
              placeholder="Re-enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#5b5bd6] py-3.5 font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-[#4b4bc0] disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
