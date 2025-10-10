import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schemas",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/invyte_card"
  },
  migrations: {
    prefix: "timestamp",
    table: "__invyte_migrations__",
    schema: "public",
  },
});
