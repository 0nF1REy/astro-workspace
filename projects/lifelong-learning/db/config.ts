import { column, defineDb, defineTable } from "astro:db";

const Links = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    description: column.text(),
    url: column.text(),
    isRead: column.boolean(),
  },
});

const Logs = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    url: column.text(),
    status: column.number(),
    date_accessed: column.date(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Links, Logs },
});
