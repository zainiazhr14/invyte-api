import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/**/*.ts",  
  out: "./src/db/migrations",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://postgres:password@localhost:5432/invyte_card",
  },
  migrations: {
    prefix: "timestamp",
    table: "__invyte_migrations__",
    schema: "public",
  },
});

