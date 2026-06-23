import { db } from "../src/lib/db";
import { Logs } from "./config";

export interface LogEntry {
  url: string;
  status: number;
  date_accessed: Date;
}

export async function insertLog(entry: LogEntry) {
  if (!import.meta.env.ASTRO_DB_REMOTE_URL && !import.meta.env.DEV) {
    return;
  }

  try {
    await db.insert(Logs).values(entry);
  } catch (error) {
    console.error(
      "[Database] Erro ao persistir log:",
      error instanceof Error ? error.message : error,
    );
  }
}
