import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@db/config";

const url = import.meta.env.ASTRO_DB_REMOTE_URL;
const authToken = import.meta.env.ASTRO_DB_APP_TOKEN;

if (!url) {
  throw new Error("ASTRO_DB_REMOTE_URL is missing");
}

const client = createClient({
  url: url,
  authToken: authToken,
});

export const db = drizzle(client, { schema });
