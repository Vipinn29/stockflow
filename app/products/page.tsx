
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";

interface Product {
  id: string;
  name: string;
  sku: string;
  description: string | null;
  quantity: number;
  costPrice: number | null;
  sellingPrice: number | null;
  lowStockThreshold: number | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch {
      setError("Products load nahi ho paye.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setProducts((previous) =>
        previous.filter((product) => product.id !== id)
      );
    } catch {
      alert("Product delete nahi ho paya.");
    }
  }

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <div className="p-8">Loading products...</div>;
  }

  return (
    <AppShell active="products">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Products
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your inventory
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="rounded-xl border border-[#dde2ec] bg-white px-4 py-3 text-sm font-semibold text-[#344054]"
            >
              Dashboard
            </Link>

            <Link
              href="/products/new"
              className="rounded-xl bg-[#5b5bd6] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-100"
            >
              Add Product
            </Link>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by product name or SKU..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="mb-6 w-full rounded-xl border border-[#dde2ec] bg-white px-4 py-3 outline-none"
        />

        {error && (
          <p className="mb-4 text-red-600">{error}</p>
        )}

        <div className="overflow-x-auto rounded-2xl border border-[#e7eaf2] bg-white shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-sm text-gray-500">
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">SKU</th>
                <th className="px-5 py-4">Quantity</th>
                <th className="px-5 py-4">Selling Price</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="px-5 py-4 font-medium">
                    {product.name}
                  </td>

                  <td className="px-5 py-4">{product.sku}</td>

                  <td className="px-5 py-4">{product.quantity}</td>

                  <td className="px-5 py-4">
                    {product.sellingPrice ?? "-"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/products/${product.id}/edit`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <p className="p-8 text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
