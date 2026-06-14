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

// 💡 We create a basic structural connection pool configuration
const databaseUser = isProduction ? "admin" : (process.env.PGUSER || "platform_builder");
const databaseName = process.env.PGDATABASE || "quant_edge_ledger";

export async function query(text: string, params?: unknown[]) {
  let passwordString = process.env.PGPASSWORD || "local_secret_password";

  if (isProduction) {
    try {
      console.log("[DB] Fetching dynamic DSQL admin auth token...");
      const signer = new DsqlSigner({
        hostname: host,
        region: process.env.AWS_REGION || "us-east-1",
        credentials: fromEnv(), // Explicitly grabs Vercel env keys safely
      });
      
      // 🔥 CRITICAL FIX: Generates admin token as a string matching user "admin"
      passwordString = await signer.getDbConnectAdminAuthToken();
      console.log("[DB] Auth token fetched successfully");
    } catch (err) {
      console.error("[DB] Failed to fetch auth token:", err);
      throw err;
    }
  }

  // Generate an isolated client context pool for query execution
  const executionPool = new Pool({
    host: host,
    port: isProduction ? 5432 : port,
    database: databaseName,
    user: databaseUser,
    password: passwordString, // Delivered explicitly as an executed string token
    ssl: isProduction ? { rejectUnauthorized: true } : false,
    max: 5,
    connectionTimeoutMillis: 5000,
  });

  try {
    return await executionPool.query(text, params);
  } finally {
    // Gracefully drop connection context immediately to prevent active session pooling bloat
    await executionPool.end();
  }
}