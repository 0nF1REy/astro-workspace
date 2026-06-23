import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const Links = sqliteTable("Links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  isRead: integer("isRead", { mode: "boolean" }).notNull().default(false),
});

export const Logs = sqliteTable("Logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  status: integer("status").notNull(),
  date_accessed: integer("date_accessed", { mode: "timestamp" }).notNull(),
});
