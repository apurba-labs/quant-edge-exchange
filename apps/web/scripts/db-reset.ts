
import nextEnv  from "@next/env";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

async function runReset() {

  const { query } = await import(
    "../src/lib/dsql/client"
  );

  console.log("⚠️ Resetting database");

  await query(`
    DROP TABLE IF EXISTS simulation_runs CASCADE;
  `);

  await query(`
    DROP TABLE IF EXISTS financial_ledger CASCADE;
  `);

  await query(`
    DROP TABLE IF EXISTS conflict_events CASCADE;
  `);

  await query(`
    DROP TABLE IF EXISTS settlements CASCADE;
  `);

  await query(`
    DROP TABLE IF EXISTS ad_bids CASCADE;
  `);

  await query(`
    DROP TABLE IF EXISTS ad_slots CASCADE;
  `);

  await query(`
    DROP TABLE IF EXISTS enterprise_accounts CASCADE;
  `);

  console.log("✅ Database reset complete");
}

runReset();