export const dynamic = "force-dynamic";

import { Pool, Client } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";

const isProduction = process.env.NODE_ENV === "production";
const host = process.env.PGHOST || "localhost";
const port = isProduction ? 5432 : Number(process.env.PGPORT || 5433);

// 🔍 DEBUGGING: Comprehensive environment logging on startup
if (isProduction) {
  console.log("=== COMPREHENSIVE DSQL RUNTIME DEBUG INFO ===");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("PGHOST:", host);
  console.log("AWS_REGION:", process.env.AWS_REGION);
  console.log("AWS_ACCESS_KEY_ID present:", !!process.env.AWS_ACCESS_KEY_ID);
  console.log("AWS_SECRET_ACCESS_KEY present:", !!process.env.AWS_SECRET_ACCESS_KEY);
  console.log("AWS_SESSION_TOKEN present:", !!process.env.AWS_SESSION_TOKEN);
  console.log("=============================================");
}

const signer = isProduction
  ? new DsqlSigner({
      hostname: host,
      region: process.env.AWS_REGION || "us-east-1",
    })
  : null;

// Persistent execution token cache block
let tokenCache: { token: string; expiry: number } | null = null;

async function getValidToken(): Promise<string> {
  if (!isProduction || !signer) {
    return process.env.PGPASSWORD || "local_secret_password";
  }

  const now = Date.now();

  // Pull directly from cache if valid
  if (tokenCache && now < tokenCache.expiry - 120000) {
    console.log("[DB LOG] Performance Win: Pulling valid token string from active cache memory.");
    return tokenCache.token;
  }

  try {
    console.log("[DB LOG] Starting token generation routine...");
    console.log("[DB LOG] Target Hostname:", host);
    console.log("[DB LOG] Target Region:", process.env.AWS_REGION || "us-east-1");
        
    const startTime = Date.now();
    // 💡 FIXED: Kept empty with zero arguments to satisfy strict AWS SDK compiler constraints
    const token = await signer.getDbConnectAdminAuthToken();
    const endTime = Date.now();
        
    console.log("[DB LOG] Token signing math finished in:", endTime - startTime, "ms");
    console.log("[DB LOG] Token length payload metrics:", token.length);
    console.log("[DB LOG] Token head fingerprint:", token.substring(0, 50) + "...");
        
    if (!token.startsWith('https://')) {
      console.error("[DB LOG] CRITICAL: Token failed signature generation rules (does not start with https://)");
    }

    tokenCache = {
      token,
      expiry: now + 900000,
    };
        
    return token;
  } catch (err: any) {
    console.error("[DB LOG FATAL] Token generation routine crashed entirely:");
    console.error("  Error Name:", err.name);
    console.error("  Error Message:", err.message);
    console.error("  Error Stack Trace:", err.stack);
    throw err;
  }
}

/**
 * 💡 SERVERLESS FACTORY INTERFACE PROXY
 */
export const pool = {
  connect: async () => {
    console.log("[DB LOG] Initializing dynamic connect request context...");
    const password = await getValidToken();
    
    // 💡 CRITICAL STABILITY CONFIG: Ensure user identity falls back gracefully
    const dbUser = isProduction ? "admin" : (process.env.PGUSER || "platform_builder");

    const client = new Client({
      host: host,
      port: port,
      database: isProduction ? "postgres" : (process.env.PGDATABASE || "quant_edge_ledger"),
      user: dbUser,
      password: password,
      ssl: isProduction ? { rejectUnauthorized: true } : false,
      connectionTimeoutMillis: 10000,
    });

    console.log("[DB LOG] Instantiating socket handshakes with parameters:");
    console.log("  -> Host:", host);
    console.log("  -> Database Target:", isProduction ? "postgres" : "quant_edge_ledger");
    console.log("  -> Resolved Username Profile:", dbUser);
        
    await client.connect();
    console.log("[DB LOG] Handshake successful! Socket linked cleanly.");
    return client;
  },

  query: async (text: string, params?: unknown[]) => {
    const password = await getValidToken();
    const dbUser = isProduction ? "admin" : (process.env.PGUSER || "platform_builder");

    const client = new Client({
      host: host,
      port: port,
      database: isProduction ? "postgres" : (process.env.PGDATABASE || "quant_edge_ledger"),
      user: dbUser,
      password: password,
      ssl: isProduction ? { rejectUnauthorized: true } : false,
      connectionTimeoutMillis: 10000,
    });

    try {
      console.log(`[DB LOG] Executing Query String Context: ${text.substring(0, 80)}...`);
      await client.connect();
      const result = await client.query(text, params);
      console.log("[DB LOG] Execution complete. Row return metric count:", result.rowCount);
      return result;
    } catch (error: any) {
      console.error("[DB LOG EXECUTION EXCEPTION] Target operation crashed:");
      console.error("  Postgres Error Code:", error.code);
      console.error("  Message Payload:", error.message);
      console.error("  Detail Fields:", error.detail);
      console.error("  Engine Hint Output:", error.hint);
      throw error;
    } finally {
      await client.end();
      console.log("[DB LOG] Socket stream cleanly returned to pool state.");
    }
  },

  end: async () => {
    console.log("[DB LOG] Pool end invoked (no-op tracker)");
    return Promise.resolve();
  }
} as unknown as Pool;

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}