"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomSlot = getRandomSlot;
exports.getSlotById = getSlotById;
exports.getSlots = getSlots;
exports.getAllSlots = getAllSlots;
const client_1 = require("@/lib/dsql/client");
async function getRandomSlot() {
    const result = await (0, client_1.query)(`
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
async function getSlotById(slotId) {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM ad_slots
    WHERE slot_id = $1
    `, [slotId]);
    return result.rows[0] ?? null;
}
async function getSlots(limit = 20) {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM ad_slots
    ORDER BY slot_name
    LIMIT $1
    `, [limit]);
    return result.rows;
}
async function getAllSlots() {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM ad_slots
    ORDER BY slot_name
  `);
    return result.rows;
}
//# sourceMappingURL=slot-repository.js.map