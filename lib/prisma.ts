import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string | undefined {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return undefined;

  const separator = databaseUrl.includes("?") ? "&" : "?";
  let urlWithPoolerParameters = databaseUrl.replace(
    /([?&])pgbouncer=[^&]*/,
    "$1pgbouncer=true"
  );
  if (!urlWithPoolerParameters.includes("pgbouncer=")) {
    urlWithPoolerParameters += `${separator}pgbouncer=true`;
  }
  if (!urlWithPoolerParameters.includes("connection_limit=")) {
    urlWithPoolerParameters += "&connection_limit=1";
  }

  return urlWithPoolerParameters;
}

const databaseUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(
    databaseUrl
      ? {
          datasources: {
            db: { url: databaseUrl },
          },
        }
      : undefined
  );

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
