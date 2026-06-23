import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@db/config";

const url = (process.env.DATABASE_URL ||
  import.meta.env.DATABASE_URL) as string;
const authToken = (process.env.DATABASE_AUTH_TOKEN ||
  import.meta.env.DATABASE_AUTH_TOKEN) as string;

if (!url) {
  throw new Error(
    "DATABASE_URL is missing. Make sure your .env file is loaded.",
  );
}

const client = createClient({
  url,
  authToken: authToken || undefined,
});

export const db = drizzle(client, { schema });
