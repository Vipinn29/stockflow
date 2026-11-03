
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";

export default function SettingsPage() {
  const [threshold, setThreshold] = useState("5");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/settings");

        if (!response.ok) {
          throw new Error("Failed to load settings");
        }

        const data = await response.json();

        setThreshold(String(data.defaultLowStockThreshold ?? 5));
      } catch {
        setError("Settings load nahi ho payi.");
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          defaultLowStockThreshold: Number(threshold),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Settings update failed");
      }

      setMessage("Settings saved successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-8">Loading settings...</div>;
  }

  return (
    <AppShell active="settings">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#e7eaf2] bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Settings
          </h1>

          <p className="mt-2 text-gray-600">
            Configure your inventory settings.
          </p>
        </div>

        {message && (
          <p className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Default Low Stock Threshold
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Products at or below this quantity will be marked as low stock,
              unless they have their own threshold.
            </p>

            <input
              type="number"
              min="0"
              step="1"
              required
              value={threshold}
              onChange={(event) => setThreshold(event.target.value)}
              className="w-full rounded-xl border border-[#dde2ec] px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[#5b5bd6] px-6 py-3 font-semibold text-white shadow-md shadow-indigo-100 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>

        <div className="mt-8 border-t pt-5">
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
