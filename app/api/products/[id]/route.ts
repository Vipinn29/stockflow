
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, context: Context) {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    const body = await req.json();

    if (
      body.quantity !== undefined &&
      (!Number.isInteger(body.quantity) || body.quantity < 0)
    ) {
      return NextResponse.json(
        { error: "Quantity must be a non-negative integer" },
        { status: 400 }
      );
    }

    const result = await prisma.product.updateMany({
      where: {
        id,
        organizationId: auth.organizationId,
      },
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

    if (result.count === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const product = await prisma.product.findFirst({
      where: {
        id,
        organizationId: auth.organizationId,
      },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Update failed" },
      { status: 400 }
    );
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


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();

    if (!user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
    });

    if (!product) {
      return Response.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return Response.json(product);
  } catch (error) {
    console.error("Get product error:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
