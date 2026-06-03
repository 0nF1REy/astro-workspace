export interface LogEntry {
  url: string;
  status: number;
  date_accessed: Date;
}

export async function insertLog(entry: LogEntry) {
  if (!import.meta.env.ASTRO_DB_REMOTE_URL && !import.meta.env.DEV) {
    console.warn(
      "[Database] Ignorando log: ASTRO_DB_REMOTE_URL não configurada.",
    );
    return;
  }

  try {
    const { db, Logs } = await import("astro:db");

    await db.insert(Logs).values(entry);
  } catch (error) {
    console.error(
      "[Database] Erro ao persistir log:",
      error instanceof Error ? error.message : error,
    );
  }
}
