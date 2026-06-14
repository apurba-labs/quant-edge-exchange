export const dynamic = "force-dynamic";

import { Pool, Client } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";

const isProduction = process.env.NODE_ENV === "production";
const host = process.env.PGHOST || "localhost";
const port = isProduction ? 5432 : Number(process.env.PGPORT || 5433);

const signer = isProduction
  ? new DsqlSigner({
      hostname: host,
      region: process.env.AWS_REGION || "us-east-1",
    })
  : null;

// 💡 MEMORY PERFORMANCE TUNING: Global cache context for serverless runtimes
let tokenCache: { token: string; expiry: number } | null = null;

/**
 * Resolves a valid cryptographic token string, pulling from active container memory
 * cache layers when available to eliminate redundant AWS signing overhead.
 */
async function getValidToken(): Promise<string> {
  if (!isProduction || !signer) {
    return process.env.PGPASSWORD || "local_secret_password";
  }

  const now = Date.now();

  // Pull directly from memory if token exists and is further than 2 minutes from expiration
  if (tokenCache && now < tokenCache.expiry - 120000) {
    console.log("[DB] Performance Win: Using cached token from memory layer");
    return tokenCache.token;
  }

  try {
    console.log("[DB] Cache miss or expired token. Generating fresh DSQL admin token...");
    // Kept empty without arguments to satisfy strict SDK type compilation rules
    const token = await signer.getDbConnectAdminAuthToken();

    tokenCache = {
      token,
      expiry: now + 900000, // Explicitly map the 15-minute validity timestamp lifecycle
    };

    console.log("[DB] New token successfully cached in memory until:", new Date(tokenCache.expiry).toISOString());
    return token;
  } catch (err) {
    console.error("[DB FATAL] Token generation handshake failed:", err);
    throw err;
  }
}

/**
 * 💡 SERVERLESS FACTORY INTERFACE
 * Proxies node-postgres Pool methods using clean, single-use Client connections
 * combined with dynamic memory caching to balance architecture security and low latency.
 */
export const pool = {
  connect: async () => {
    console.log("[DB] Spawning dedicated standalone connection client context...");
    const password = await getValidToken();

    const client = new Client({
      host: host,
      port: port,
      database: isProduction ? "postgres" : (process.env.PGDATABASE || "quant_edge_ledger"),
      user: isProduction ? "admin" : (process.env.PGUSER || "platform_builder"),
      password: password,
      ssl: isProduction ? { rejectUnauthorized: true } : false,
      connectionTimeoutMillis: 10000,
    });

    await client.connect();
    console.log("[DB] Client connected successfully");
    return client;
  },

  query: async (text: string, params?: unknown[]) => {
    const password = await getValidToken();

    const client = new Client({
      host: host,
      port: port,
      database: isProduction ? "postgres" : (process.env.PGDATABASE || "quant_edge_ledger"),
      user: isProduction ? "admin" : (process.env.PGUSER || "platform_builder"),
      password: password,
      ssl: isProduction ? { rejectUnauthorized: true } : false,
      connectionTimeoutMillis: 10000,
    });

    try {
      console.log(`[DB] Connecting to ${host}:${port} as ${isProduction ? 'admin' : (process.env.PGUSER || 'platform_builder')}`);
      await client.connect();
      console.log("[DB] Executing repository query string...");
      const result = await client.query(text, params);
      console.log("[DB] Query executed successfully, rows returned:", result.rowCount);
      return result;
    } catch (error) {
      console.error("[DB] Query execution runtime exception failed:", error);
      throw error;
    } finally {
      await client.end(); // Guarantee structural connection socket teardown
      console.log("[DB] Connection socket closed safely");
    }
  },

  end: async () => {
    console.log("[DB] Pool.end() invoked (no-op context for serverless pattern)");
    return Promise.resolve();
  }
} as unknown as Pool;

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}