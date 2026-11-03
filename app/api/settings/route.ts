
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

  const settings = await prisma.settings.findUnique({
    where: { organizationId: auth.organizationId },
  });

  return NextResponse.json({
    defaultLowStockThreshold:
      settings?.defaultLowStockThreshold ?? 5,
  });
}

export async function PUT(req: Request) {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { defaultLowStockThreshold } = await req.json();

  if (
    !Number.isInteger(defaultLowStockThreshold) ||
    defaultLowStockThreshold < 0
  ) {
    return NextResponse.json(
      { error: "Threshold must be a non-negative integer" },
      { status: 400 }
    );
  }

  const settings = await prisma.settings.upsert({
    where: { organizationId: auth.organizationId },
    update: { defaultLowStockThreshold },
    create: {
      organizationId: auth.organizationId,
      defaultLowStockThreshold,
    },
  });

  return NextResponse.json(settings);
}
