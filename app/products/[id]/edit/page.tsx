
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/AppShell";

interface ProductForm {
  name: string;
  sku: string;
  description: string;
  quantity: string;
  costPrice: string;
  sellingPrice: string;
  lowStockThreshold: string;
}

function EditProductForm() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    sku: "",
    description: "",
    quantity: "0",
    costPrice: "",
    sellingPrice: "",
    lowStockThreshold: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const product = await response.json();

        setForm({
          name: product.name,
          sku: product.sku,
          description: product.description ?? "",
          quantity: String(product.quantity),
          costPrice: product.costPrice?.toString() ?? "",
          sellingPrice: product.sellingPrice?.toString() ?? "",
          lowStockThreshold:
            product.lowStockThreshold?.toString() ?? "",
        });
      } catch {
        setError("Product load nahi ho paya.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          costPrice: form.costPrice ? Number(form.costPrice) : null,
          sellingPrice: form.sellingPrice
            ? Number(form.sellingPrice)
            : null,
          lowStockThreshold: form.lowStockThreshold
            ? Number(form.lowStockThreshold)
            : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Update failed");
      }

      router.push("/products");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#dde2ec] px-4 py-3 outline-none";

  if (loading) {
    return <div className="p-8">Loading product...</div>;
  }

  return (
    <AppShell active="products">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#e7eaf2] bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">
          Edit Product
        </h1>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">Product Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">SKU *</label>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Quantity *</label>
            <input
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={form.quantity}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Cost Price</label>
            <input
              name="costPrice"
              type="number"
              min="0"
              step="0.01"
              value={form.costPrice}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Selling Price</label>
            <input
              name="sellingPrice"
              type="number"
              min="0"
              step="0.01"
              value={form.sellingPrice}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Low Stock Threshold
            </label>
            <input
              name="lowStockThreshold"
              type="number"
              min="0"
              step="1"
              value={form.lowStockThreshold}
              onChange={handleChange}
              className={inputClass}
              placeholder="Use organization default"
            />
          </div>

          <div className="flex gap-4 pt-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#5b5bd6] px-6 py-3 font-semibold text-white shadow-md shadow-indigo-100 disabled:opacity-50"
            >
              {saving ? "Updating..." : "Update Product"}
            </button>

            <Link
              href="/products"
              className="rounded-xl border border-[#dde2ec] px-6 py-3 font-semibold text-[#344054]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading editor...</div>}>
      <EditProductForm />
    </Suspense>
  );
}
