
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: { organizationId: auth.organizationId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, sku, quantity, costPrice, sellingPrice, lowStockThreshold, description } = body;

    if (!name?.trim() || !sku?.trim()) {
      return NextResponse.json(
        { error: "Name and SKU are required" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      return NextResponse.json(
        { error: "Quantity must be a non-negative integer" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        sku: sku.trim(),
        quantity,
        description: description || null,
        costPrice: costPrice ?? null,
        sellingPrice: sellingPrice ?? null,
        lowStockThreshold: lowStockThreshold ?? null,
        organizationId: auth.organizationId,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { error: "Could not create product. Check if SKU already exists." },
      { status: 400 }
    );
  }
}
