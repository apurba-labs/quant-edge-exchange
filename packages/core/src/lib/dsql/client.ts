export const dynamic = "force-dynamic";

import { Pool } from "pg";
import { DsqlSigner } from "@aws-sdk/dsql-signer";

const isProduction = process.env.NODE_ENV === "production";
const host = process.env.PGHOST || "localhost";
const port = isProduction ? 5432 : Number(process.env.PGPORT || 5433);

// Initialize structural placeholders
let currentPool: Pool | null = null;
let tokenExpiry = 0;

const signer = isProduction
  ? new DsqlSigner({
      hostname: host,
      region: process.env.AWS_REGION || "us-east-1",
    })
  : null;

/**
 * Resolves the active connection pool instance.
 * Automatically rotates and reinstantiates string tokens prior to expiration windows.
 */
async function getPool(): Promise<Pool> {
  const now = Date.now();

  if (isProduction) {
    // Refresh connection context if no pool exists or if the token is within 2 minutes of expiring
    if (!currentPool || now >= tokenExpiry - 120000) {
      console.log("=== [DSQL LIFECYCLE] Initializing/Renewing Pool with Fresh Admin Token ===");

      if (currentPool) {
        console.log("[DSQL] Draining stale connection pool instances...");
        await currentPool.end();
      }

      try {
        console.log("[DSQL] Generating cryptographic admin token string...");
        // Non-null assertion (!) is safe here because signer is always instantiated when isProduction is true
        const token = await signer!.getDbConnectAdminAuthToken();
        
        tokenExpiry = now + 900000; // Track 15-minute expiration timeline
        console.log(`[DSQL] Token string assigned successfully (Length: ${token.length})`);

        currentPool = new Pool({
          host: host,
          port: port,
          database: "postgres",
          user: "admin",
          password: token, // Pure string array payload - no callback traps!
          ssl: { rejectUnauthorized: true },
          max: 10,
          connectionTimeoutMillis: 10000,
          idleTimeoutMillis: 30000,
        });
      } catch (err) {
        console.error("[DSQL FATAL] Failed to configure authenticated database pool context:", err);
        throw err;
      }
    }
  } else if (!currentPool) {
    // LOCAL DEVELOPMENT PATHWAY
    console.log("[DSQL] Spawning persistent local workspace pool instance...");
    currentPool = new Pool({
      host: host,
      port: port,
      database: process.env.PGDATABASE || "quant_edge_ledger",
      user: process.env.PGUSER || "platform_builder",
      password: process.env.PGPASSWORD || "local_secret_password",
      ssl: false,
      max: 5,
    });
  }

  return currentPool;
}

/**
 * 💡 FIXED TRAP FOR SETTLEMENT REPOSITORY: 
 * Proxy Getter Object satisfies the direct 'pool' object imports by matching the interface!
 */
export const pool = {
  connect: async () => {
    const activePool = await getPool();
    return activePool.connect();
  },
  query: async (text: string, params?: unknown[]) => {
    const activePool = await getPool();
    return activePool.query(text, params);
  },
  end: async () => {
    if (currentPool) {
      await currentPool.end();
    }
  }
} as unknown as Pool;

/**
 * Clean data manipulation entry point matching standard repository access layers.
 */
export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}