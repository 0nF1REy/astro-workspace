import { db, Logs } from "astro:db";

export interface LogEntry {
  url: string;
  status: number;
  date_accessed: Date;
}

export async function insertLog(entry: LogEntry) {
  try {
    await db.insert(Logs).values(entry);
  } catch (error) {
    console.error(
      "[Database] Erro ao persistir log:",
      error instanceof Error ? error.message : error,
    );
  }
}
