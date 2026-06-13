import { Pool } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";

const isProduction = process.env.NODE_ENV === "production";
const host = process.env.PGHOST || "localhost";
const port = Number(process.env.PGPORT || 5433);

if (isProduction) {
    console.log(`[DB CONNECT] Initializing production pool for cluster: ${host}`);
}

export const pool = new Pool({
    host: host,
    port: isProduction ? 5432 : port, // DSQL uses standard port 5432 in production
    database: process.env.PGDATABASE || "postgres",
    user: process.env.PGUSER || "platform_builder",
    
    // Dynamic credential handshake switch
    password: isProduction
        ? async () => {
              const signer = new DsqlSigner({
                  hostname: host,
                  region: process.env.AWS_REGION || "us-east-1",
              });
              // Fetches a short-lived IAM connection token for your vercel_app_role
              return signer.getDbConnectAuthToken();
          }
        : (process.env.PGPASSWORD || "local_secret_password"),
        
    // DSQL strictly requires SSL encrypted lines in the cloud
    ssl: isProduction
        ? {
              rejectUnauthorized: false,
          }
        : false,
});

export async function query(text: string, params?: unknown[]) {
    return pool.query(text, params);
}