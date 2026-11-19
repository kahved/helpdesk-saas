import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({
    path: fileURLToPath(new URL("../../.env", import.meta.url)),
    quiet: true,
});

const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
    throw new Error("DATABASE_URL is required. Set it in server/.env or in the environment.");
}

export const pool = new Pool({ connectionString });
