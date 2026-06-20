/**
 * Quant Edge Exchange
 *
 * Local database bootstrap utility.
 *
 * Intended for:
 * - Local PostgreSQL Docker environment
 * - Development validation
 * - Clean-room setup testing
 *
 * Aurora DSQL production setup is performed
 * manually using:
 *
 * infrastructure/scripts/schema_production.sql
 * infrastructure/scripts/seed.sql
 */

export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";

import nextEnv  from "@next/env";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

async function runSetup() {
  console.log("");
  console.log("================================");
  console.log("Quant Edge Exchange DB Setup");
  console.log("================================");
  console.log("");

  try {
    const { query } = await import("../src/lib/dsql/client");

    console.log("🔌 Testing database connection...");

    await query("SELECT 1");

    console.log("✅ Database connected");

    const schemaPath = path.resolve(
      process.cwd(),
      "../../infrastructure/scripts/schema.sql"
    );

    const seedPath = path.resolve(
      process.cwd(),
      "../../infrastructure/scripts/seed.sql"
    );

    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found: ${schemaPath}`);
    }

    if (!fs.existsSync(seedPath)) {
      throw new Error(`Seed file not found: ${seedPath}`);
    }

    console.log("📄 Applying schema...");

    const schemaSql = fs.readFileSync(
      schemaPath,
      "utf8"
    );

    await query(schemaSql);

    console.log("✅ Schema verified");

    const accountResult = await query(`
      SELECT COUNT(*) AS count
      FROM enterprise_accounts
    `);

    const accountCount = Number(
      accountResult.rows[0].count
    );

    if (accountCount === 0) {
      console.log("📊 Loading seed data...");

      const seedSql = fs.readFileSync(
        seedPath,
        "utf8"
      );

      await query(seedSql);

      console.log("✅ Seed data loaded");
    } else {
      console.log(
        `✅ Existing data detected (${accountCount} accounts)`
      );
    }

    const accounts = await query(`
      SELECT COUNT(*) AS count
      FROM enterprise_accounts
    `);

    const slots = await query(`
      SELECT COUNT(*) AS count
      FROM ad_slots
    `);

    console.log("");
    console.log("📈 Database Summary");
    console.log("--------------------");
    console.log(
      `Accounts : ${accounts.rows[0].count}`
    );
    console.log(
      `Slots    : ${slots.rows[0].count}`
    );
    console.log("");
    console.log("🚀 Database ready");
    console.log("");

    try {

      const { createBidEventsTable } = await import("../src/lib/dynamodb/create-table");

      await createBidEventsTable();

    } catch (error: any) {

      if (
        error?.message?.includes("preexisting table")
      ) {

        console.log(
          "✅ DynamoDB table already exists"
        );

      } else {

        throw error;

      }
    }

  } catch (error) {

    console.error("");
    console.error("❌ Database setup failed");
    console.error("");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exit(1);
  }
}

runSetup();