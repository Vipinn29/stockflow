
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";

interface Product {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  lowStockThreshold: number | null;
}

interface DashboardData {
  organizationName: string;
  totalProducts: number;
  totalStockQuantity: number;
  lowStockItems: Product[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch("/api/dashboard");

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const result = await response.json();
        setData(result);
      } catch {
        setError("Dashboard data load nahi ho paya.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return     <div className="grid min-h-screen place-items-center text-sm text-[#667085]">Loading dashboard...</div>;
  }

  if (error || !data) {
    return (
      <div className="p-8 text-red-600">
        {error || "Something went wrong"}
      </div>
    );
  }

  return (
    <AppShell active="dashboard">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
          <h1 className="mt-1 text-lg font-semibold text-[#5b5bd6]">
              {data.organizationName}
            </h1>
            <p className="mt-2 text-gray-600">
              Inventory overview
            </p>
            
          </div>

          
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-[#5b5bd6] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-[#4b4bc0]"
            >
              Manage Products
            </Link>
            
            <Link
              href="/settings"
              className="rounded-xl border border-[#dde2ec] bg-white px-5 py-3 text-sm font-semibold text-[#344054] hover:bg-[#f9fafc]"
            >
              Settings
            </Link>

          </div>

        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#e7eaf2] bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Total Products</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {data.totalProducts}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#e7eaf2] bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Stock Quantity
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {data.totalStockQuantity}
            </h2>
          </div>

          <div className="rounded-2xl border border-[#e7eaf2] bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Low Stock Items</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {data.lowStockItems.length}
            </h2>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-[#e7eaf2] bg-white shadow-sm">
          <div className="border-b border-[#edf0f5] px-6 py-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Low Stock Products
          </h2>
          </div>

          {data.lowStockItems.length === 0 ? (
            <p className="text-gray-500">
              No low-stock products. All good!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-sm text-gray-500">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">SKU</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Threshold</th>
                  </tr>
                </thead>

                <tbody>
                  {data.lowStockItems.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-3 font-medium">
                        {product.name}
                      </td>
                      <td className="px-4 py-3">{product.sku}</td>
                      <td className="px-4 py-3 text-red-600">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-3">
                        {product.lowStockThreshold ?? "Default"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
