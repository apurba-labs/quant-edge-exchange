"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettlement = createSettlement;
exports.getRecentSettlements = getRecentSettlements;
exports.createSettlementWithRetry = createSettlementWithRetry;
const client_1 = require("@/lib/dsql/client");
const retry_1 = require("@/lib/dsql/retry");
const client_2 = require("@/lib/dsql/client");
async function createSettlement(input) {
    const result = await (0, client_1.query)(`
    INSERT INTO settlements (
      winning_bid_id,
      winner_account_id,
      slot_id,
      settlement_amount
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [
        input.winningBidId,
        input.winnerAccountId,
        input.slotId,
        input.settlementAmount,
    ]);
    return result.rows[0];
}
async function getRecentSettlements(limit = 20) {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM settlements
    ORDER BY settled_at DESC
    LIMIT $1
    `, [limit]);
    return result.rows;
}
async function createSettlementWithRetry(input) {
    return (0, retry_1.withRetry)(async () => {
        const client = await client_2.pool.connect();
        try {
            await client.query("BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE");
            const result = await client.query(`
          INSERT INTO settlements (
            winning_bid_id,
            winner_account_id,
            slot_id,
            settlement_amount
          )
          VALUES ($1, $2, $3, $4)
          RETURNING *
          `, [
                input.winningBidId,
                input.winnerAccountId,
                input.slotId,
                input.settlementAmount,
            ]);
            await client.query("COMMIT");
            return result.rows[0];
        }
        catch (error) {
            await client.query("ROLLBACK");
            if (typeof error === "object" && error !== null && "code" in error) {
                const pgError = error;
                if (pgError.code === "23505") {
                    console.log("⚠️ Duplicate settlement prevented");
                    return null;
                }
            }
            throw error;
        }
        finally {
            client.release();
        }
    });
}
//# sourceMappingURL=settlement-repository.js.map