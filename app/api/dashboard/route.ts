
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const organizationId = auth.organizationId;

  const [totalProducts, stock, products, settings] =
    await Promise.all([
      prisma.product.count({
        where: { organizationId },
      }),

      prisma.product.aggregate({
        where: { organizationId },
        _sum: { quantity: true },
      }),

      prisma.product.findMany({
        where: { organizationId },
        select: {
          id: true,
          name: true,
          sku: true,
          quantity: true,
          lowStockThreshold: true,
        },
      }),

      prisma.settings.findUnique({
        where: { organizationId },
      }),
    ]);

  const defaultThreshold =
    settings?.defaultLowStockThreshold ?? 5;

  const lowStockItems = products.filter((product) => {
    const threshold =
      product.lowStockThreshold ?? defaultThreshold;

    return product.quantity <= threshold;
  });

  return NextResponse.json({
    totalProducts,
    totalStockQuantity: stock._sum.quantity ?? 0,
    lowStockItems,
  });
}
