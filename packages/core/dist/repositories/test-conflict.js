"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bid_repository_1 = require("./bid-repository");
const settlement_repository_1 = require("./settlement-repository");
async function run() {
    const bid = await (0, bid_repository_1.getLatestBid)();
    console.log("Using bid:", bid.bid_id);
    const payload = {
        winningBidId: bid.bid_id,
        winnerAccountId: bid.account_id,
        slotId: bid.slot_id,
        settlementAmount: Number(bid.bid_amount),
    };
    await Promise.all([
        (0, settlement_repository_1.createSettlementWithRetry)(payload),
        (0, settlement_repository_1.createSettlementWithRetry)(payload),
        (0, settlement_repository_1.createSettlementWithRetry)(payload),
    ]);
    console.log(" ✅ Conflict test completed");
}
run();
//# sourceMappingURL=test-conflict.js.map