"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBid = createBid;
exports.getRecentBids = getRecentBids;
exports.getLatestBid = getLatestBid;
const client_1 = require("@/lib/dsql/client");
async function createBid(input) {
    const result = await (0, client_1.query)(`
    INSERT INTO ad_bids (
      account_id,
      slot_id,
      bid_amount,
      region
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [
        input.accountId,
        input.slotId,
        input.bidAmount,
        input.region,
    ]);
    return result.rows[0];
}
async function getRecentBids(limit = 20) {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM ad_bids
    ORDER BY created_at DESC
    LIMIT $1
    `, [limit]);
    return result.rows;
}
async function getLatestBid() {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM ad_bids
    ORDER BY created_at DESC
    LIMIT 1
    `);
    return result.rows[0];
}
//# sourceMappingURL=bid-repository.js.map