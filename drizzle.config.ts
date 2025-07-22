import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set - using local PostgreSQL");
  process.env.DATABASE_URL = "postgresql://postgres:password@localhost:5432/globalbids";
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  driver: "pg",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
