"use server";

export const dynamic = "force-dynamic";

import { Pool, Client } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";

const isProduction = process.env.NODE_ENV === "production";
const host = process.env.PGHOST || "localhost";
const port = isProduction ? 5432 : Number(process.env.PGPORT || 5433);

console.log("🔍 DSQL CLIENT LOADED - Environment:", process.env.NODE_ENV);

// 🔍 COMPREHENSIVE DEBUGGING
if (isProduction) {
  console.log("=== VERCEL ENVIRONMENT DEBUG ===");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("PGHOST:", process.env.PGHOST);
  console.log("AWS_REGION:", process.env.AWS_REGION);
  console.log("AWS_ACCESS_KEY_ID present:", !!process.env.AWS_ACCESS_KEY_ID);
  console.log("AWS_ACCESS_KEY_ID length:", process.env.AWS_ACCESS_KEY_ID?.length || 0);
  console.log("AWS_ACCESS_KEY_ID first 10 chars:", process.env.AWS_ACCESS_KEY_ID?.substring(0, 10) || "MISSING");
  console.log("AWS_SECRET_ACCESS_KEY present:", !!process.env.AWS_SECRET_ACCESS_KEY);
  console.log("AWS_SECRET_ACCESS_KEY length:", process.env.AWS_SECRET_ACCESS_KEY?.length || 0);
  console.log("AWS_SESSION_TOKEN present:", !!process.env.AWS_SESSION_TOKEN);
  console.log("================================");
}

// Test credentials function
async function testCredentials(): Promise<boolean> {
  if (!isProduction) return true;
  
  try {
    console.log("[CRED TEST] Testing AWS credentials in Vercel...");
    
    const { STSClient, GetCallerIdentityCommand } = await import("@aws-sdk/client-sts");
    
    const stsClient = new STSClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    });
    
    const result = await stsClient.send(new GetCallerIdentityCommand({}));
    console.log("[CRED TEST] ✅ Credentials work! ARN:", result.Arn);
    console.log("[CRED TEST] Account:", result.Account);
    console.log("[CRED TEST] UserId:", result.UserId);
    return true;
  } catch (error: any) {
    console.error("[CRED TEST] ❌ Credentials failed:", error?.message || error);
    console.error("[CRED TEST] Error name:", error?.name || "Unknown");
    return false;
  }
}

// Test DSQL permissions
async function testDSQLPermissions(): Promise<boolean> {
  if (!isProduction) return true;
  
  try {
    console.log("[DSQL TEST] Testing DSQL permissions...");
    
    const { DSQLClient, GetClusterCommand } = await import("@aws-sdk/client-dsql");
    
    const dsqlClient = new DSQLClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    });
    
    const result = await dsqlClient.send(new GetClusterCommand({
      identifier: "z5t2lx6nzdk3ccilryg7q2dapi"
    }));
    
    console.log("[DSQL TEST] ✅ DSQL permissions work! Status:", result.status);
    return true;
  } catch (error: any) {
    console.error("[DSQL TEST] ❌ DSQL permissions failed:", error?.message || error);
    console.error("[DSQL TEST] Error code:", error?.name || "Unknown");
    return false;
  }
}

async function getValidToken(): Promise<string> {
  console.log("🔍 getValidToken called, isProduction:", isProduction);
  
  if (!isProduction) {
    console.log("🔍 Using local password");
    return process.env.PGPASSWORD || "local_secret_password";
  }

  // Validate environment variables
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("🔍 AWS credentials missing in Vercel!");
  }

  // Test credentials first
  const credentialsWork = await testCredentials();
  if (!credentialsWork) {
    throw new Error("AWS credentials are invalid in Vercel environment");
  }

  // Test DSQL permissions
  const dsqlPermissions = await testDSQLPermissions();
  if (!dsqlPermissions) {
    throw new Error("DSQL permissions are missing in Vercel environment");
  }

  try {
    console.log("[TOKEN] Creating DsqlSigner for ADMIN token...");
    
    // Create signer with explicit credentials
    const signer = new DsqlSigner({
      hostname: host,
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      }
    });

    console.log("[TOKEN] Generating ADMIN token...");
    const startTime = Date.now();
    
    // ✅ CRITICAL FIX: Use getDbConnectAdminAuthToken for admin user
    const token = await signer.getDbConnectAdminAuthToken();
    
    const endTime = Date.now();
    console.log("[TOKEN] ✅ ADMIN token generated in", endTime - startTime, "ms");
    console.log("[TOKEN] Token length:", token.length);
    console.log("[TOKEN] Token starts with:", token.substring(0, 50) + "...");
    
    if (!token.startsWith('https://')) {
      console.error("[TOKEN] ❌ Invalid token format - doesn't start with https://");
      throw new Error("Invalid token format");
    }
    
    return token;
  } catch (err: any) {
    console.error("[TOKEN] ❌ ADMIN token generation failed:", err?.message || err);
    throw err;
  }
}

export const pool = {
  query: async (text: string, params?: unknown[]) => {
    console.log("🔍 pool.query called");
    
    try {
      const password = await getValidToken();
      console.log("🔍 Got token, connecting to database...");

      const client = new Client({
        host: host,
        port: port,
        database: isProduction ? "postgres" : (process.env.PGDATABASE || "quant_edge_ledger"),
        user: isProduction ? "admin" : (process.env.PGUSER || "platform_builder"),
        password: password,
        ssl: isProduction ? { rejectUnauthorized: true } : false,
        connectionTimeoutMillis: 10000,
      });

      console.log(`🔍 Connecting as user: ${isProduction ? "admin" : (process.env.PGUSER || "platform_builder")}`);
      console.log(`🔍 Connecting to database: ${isProduction ? "postgres" : (process.env.PGDATABASE || "quant_edge_ledger")}`);
      console.log(`🔍 Token length: ${password.length}`);
      
      await client.connect();
      console.log("🔍 ✅ Connected successfully!");
      
      const result = await client.query(text, params);
      console.log("🔍 ✅ Query successful, rows:", result.rowCount);
      
      await client.end();
      return result;
      
    } catch (error: any) {
      console.error("🔍 ❌ Database operation failed:");
      console.error("🔍   Code:", error?.code);
      console.error("🔍   Message:", error?.message);
      console.error("🔍   Detail:", error?.detail);
      console.error("🔍   Hint:", error?.hint);
      throw error;
    }
  },

  end: async () => Promise.resolve()
} as unknown as Pool;

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}
