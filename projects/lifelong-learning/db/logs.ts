import { db } from "@lib/db";
import { Logs } from "./config";

export interface LogEntry {
  url: string;
  status: number;
  date_accessed: Date;
}

export async function insertLog(entry: LogEntry) {
  const url = (process.env.DATABASE_URL ||
    import.meta.env.DATABASE_URL) as string;
  const isDev = import.meta.env.DEV;

  if (!url && !isDev) {
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
