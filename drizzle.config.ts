import type { Config } from "drizzle-kit";

import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
  dialect: "turso",
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config;
