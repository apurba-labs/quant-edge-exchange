import { Pool } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";
import { fromEnv } from "@aws-sdk/credential-providers"; // 💡 Import explicit env provider

export const dynamic = "force-dynamic";

const isProduction = process.env.NODE_ENV === "production";

const host = isProduction 
  ? (process.env.PGHOST || "z5t2lx6nzdk3ccilryg7q2dapi.dsql.us-east-1.on.aws")
  : "localhost";

// 🔍 CRITICAL RUNTIME LOGS (Will show up under the Vercel "Logs" tab)
console.log("=== AWS ENVIRONMENT INJECTION CHECK ===");
console.log("AWS_ACCESS_KEY_ID PRESENT:", !!process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY PRESENT:", !!process.env.AWS_SECRET_ACCESS_KEY);
console.log("AWS_REGION:", process.env.AWS_REGION || "us-east-1");
console.log("=======================================");

export const pool = new Pool({
  host: host,
  port: isProduction ? 5432 : Number(process.env.PGPORT || 5433),
  database: process.env.PGDATABASE || "postgres",
  user: isProduction ? "vercel_app_role" : (process.env.PGUSER || "platform_builder"),
  
  password: isProduction
    ? async () => {
        const signer = new DsqlSigner({
          hostname: host,
          region: process.env.AWS_REGION || "us-east-1",
          credentials: fromEnv(), // 🔥 FORCE AWS SDK to look at process.env variables
        });
        return signer.getDbConnectAuthToken();
      }
    : (process.env.PGPASSWORD || "local_secret_password"),
      
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}