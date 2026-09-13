import { neon } from "@neondatabase/serverless";

export const isDbConfigured = Boolean(process.env.DATABASE_URL);

export const sql = isDbConfigured ? neon(process.env.DATABASE_URL!) : null;
