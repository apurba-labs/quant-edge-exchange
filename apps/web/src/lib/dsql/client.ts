import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT || 5433),
    database: process.env.PGDATABASE || "quant_edge_ledger",
    user: process.env.PGUSER || "platform_builder",
    password: process.env.PGPASSWORD || "local_secret_password",
});

export async function query(
    text: string,
    params?: unknown[]
) {
    return pool.query(text, params);
}
