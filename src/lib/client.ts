import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: "127.0.0.1", // your database host
  user: "heidi", // your database username
  password: "1234", // your database password
  database: "socialogram", // optional, your database name
});

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
