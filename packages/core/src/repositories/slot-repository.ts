import { query } from "../lib/dsql/client";

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

  return result.rows;
}

export async function getAllSlots() {
  const result = await query(`
    SELECT *
    FROM ad_slots
    ORDER BY slot_name
  `);

  return result.rows;
}