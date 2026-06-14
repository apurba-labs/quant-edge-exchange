import { Pool } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";

// Forces Next.js to evaluate this module dynamically at execution time
export const dynamic = "force-dynamic";

const isProduction = process.env.NODE_ENV === "production";

// Fallback directly to your live AWS cluster endpoint string if process.env isn't ready
const host = isProduction 
  ? (process.env.PGHOST || "z5t2lx6nzdk3ccilryg7q2dapi.dsql.us-east-1.on.aws")
  : "localhost";

export const pool = new Pool({
  host: host,
  port: isProduction ? 5432 : Number(process.env.PGPORT || 5433),
  database: process.env.PGDATABASE || "postgres",
  user: isProduction ? "vercel_app_role" : (process.env.PGUSER || "platform_builder"),
  
  password: isProduction
    ? async () => {

        console.log("=== VERCEL AWS RUNTIME ENVIRONMENT CHECK ===");
        console.log("AWS_ACCESS_KEY_ID EXISTS:", !!process.env.AWS_ACCESS_KEY_ID);
        console.log("AWS_SECRET_ACCESS_KEY EXISTS:", !!process.env.AWS_SECRET_ACCESS_KEY);
        console.log("AWS_REGION:", process.env.AWS_REGION);
        console.log("NODE_ENV:", process.env.NODE_ENV);
        console.log("============================================");

        // Let AWS SDK default provider chain fetch the environment variables automatically
        const signer = new DsqlSigner({
          hostname: host,
          region: process.env.AWS_REGION || "us-east-1",
        });
        // This fetches the secure, temporary cryptographic token
        return signer.getDbConnectAuthToken();
      }
    : (process.env.PGPASSWORD || "local_secret_password"),
      
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}