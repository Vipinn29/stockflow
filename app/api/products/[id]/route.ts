
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, context: Context) {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await req.json();

    const existing = await prisma.product.findFirst({
      where: {
        id,
        organizationId: auth.organizationId,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (body.quantity !== undefined &&
        (!Number.isInteger(body.quantity) || body.quantity < 0)) {
      return NextResponse.json(
        { error: "Quantity must be a non-negative integer" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        sku: body.sku,
        description: body.description,
        quantity: body.quantity,
        costPrice: body.costPrice,
        sellingPrice: body.sellingPrice,
        lowStockThreshold: body.lowStockThreshold,
      },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, context: Context) {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const result = await prisma.product.deleteMany({
    where: {
      id,
      organizationId: auth.organizationId,
    },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Product deleted successfully" });
}
