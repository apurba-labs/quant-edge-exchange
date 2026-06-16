import { query } from "@/lib/dsql/client";

export async function getRandomSlot() {
  const result = await query(`
    SELECT
      slot_id,
      slot_name,
      base_price
    FROM ad_slots
    ORDER BY RANDOM()
    LIMIT 1
  `);

  if (!result.rows.length) {
    throw new Error(
      "No ad slots found. Run seed data."
    );
  }

  return result.rows[0];
}

export async function getSlotById(
  slotId: string
) {
  const result = await query(
    `
    SELECT *
    FROM ad_slots
    WHERE slot_id = $1
    `,
    [slotId]
  );

  if (!result.rows.length) {
    throw new Error(
      "No ad slots found. Run seed data."
    );
  }

  return result.rows[0] ?? null;
}

export async function getSlots(
  limit: number = 20
) {
  const result = await query(
    `
    SELECT *
    FROM ad_slots
    ORDER BY slot_name
    LIMIT $1
    `,
    [limit]
  );

  if (!result.rows.length) {
    throw new Error(
      "No ad slots found. Run seed data."
    );
  }

  return result.rows;
}

export async function getAllSlots() {
  const result = await query(`
    SELECT *
    FROM ad_slots
    ORDER BY slot_name
  `);

  if (!result.rows.length) {
    throw new Error(
      "No ad slots found. Run seed data."
    );
  }

  return result.rows;
}