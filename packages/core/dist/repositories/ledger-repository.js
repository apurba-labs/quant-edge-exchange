"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLedgerEntry = createLedgerEntry;
exports.getRecentLedgerEntries = getRecentLedgerEntries;
const client_1 = require("@/lib/dsql/client");
async function createLedgerEntry(input) {
    const result = await (0, client_1.query)(`
    INSERT INTO financial_ledger (
      account_id,
      slot_id,
      amount,
      transaction_type,
      origin_region
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `, [
        input.accountId,
        input.slotId ?? null,
        input.amount,
        input.transactionType,
        input.originRegion,
    ]);
    return result.rows[0];
}
async function getRecentLedgerEntries(limit = 20) {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM financial_ledger
    ORDER BY created_at DESC
    LIMIT $1
    `, [limit]);
    return result.rows;
}
//# sourceMappingURL=ledger-repository.js.map