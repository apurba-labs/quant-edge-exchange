export const dynamic = "force-dynamic";

import { Pool } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";
import { fromEnv } from "@aws-sdk/credential-providers";

const isProduction = process.env.NODE_ENV === "production";
const host = process.env.PGHOST || "localhost";
const port = Number(process.env.PGPORT || 5433);

if (isProduction) {
  console.log("=== AWS ENVIRONMENT INJECTION CHECK ===");
  console.log("AWS_ACCESS_KEY_ID PRESENT:", !!process.env.AWS_ACCESS_KEY_ID);
  console.log("AWS_SECRET_ACCESS_KEY PRESENT:", !!process.env.AWS_SECRET_ACCESS_KEY);
  console.log("AWS_REGION:", process.env.AWS_REGION);
  console.log("PGHOST:", process.env.PGHOST);
  console.log("=======================================");
  console.log(`[DB CONNECT] Initializing production pool for cluster: ${host}`);
}

export const pool = new Pool({
  host: host,
  port: isProduction ? 5432 : port,
  database: process.env.PGDATABASE || "quant_edge_ledger",
  user: process.env.PGUSER || "platform_builder",

  password: isProduction
    ? async () => {
        try {
          console.log("[DB] Fetching DSQL auth token...");
          const credentials = fromEnv();
          const signer = new DsqlSigner({
            hostname: host,
            region: process.env.AWS_REGION || "us-east-1",
            credentials: credentials,
          });
          const token = await signer.getDbConnectAuthToken();
          console.log("[DB] Auth token fetched successfully");
          return token;
        } catch (err) {
          console.error("[DB] Failed to fetch auth token:", err);
          throw err;
        }
      }
    : process.env.PGPASSWORD || "local_secret_password",

  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}