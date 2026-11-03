
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface AuthPayload {
  userId: string;
  organizationId: string;
}

export async function getAuthUser(): Promise<AuthPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      typeof decoded === "string" ||
      !("userId" in decoded) ||
      !("organizationId" in decoded)
    ) {
      return null;
    }

    return {
      userId: decoded.userId as string,
      organizationId: decoded.organizationId as string,
    };
  } catch {
    return null;
  }
}
