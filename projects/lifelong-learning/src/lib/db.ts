import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@db/config";

const url = (process.env.DATABASE_URL ||
  import.meta.env.DATABASE_URL) as string;
const authToken = (process.env.DATABASE_AUTH_TOKEN ||
  import.meta.env.DATABASE_AUTH_TOKEN) as string;

if (!url && import.meta.env.PROD) {
  console.warn(
    "DATABASE_URL is missing. Database connection will likely fail.",
  );
}

const client = createClient({
  url: url || "file:local.db",
  authToken: authToken || undefined,
});

export const db = drizzle(client, { schema });
