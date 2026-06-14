"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_repository_1 = require("./account-repository");
const slot_repository_1 = require("./slot-repository");
const bid_repository_1 = require("./bid-repository");
const settlement_repository_1 = require("./settlement-repository");
async function main() {
    const account = await (0, account_repository_1.getRandomAccount)();
    const slot = await (0, slot_repository_1.getRandomSlot)();
    const bid = await (0, bid_repository_1.createBid)({
        accountId: account.account_id,
        slotId: slot.slot_id,
        bidAmount: Number(slot.base_price) + 10,
        region: "eu-west-1",
    });
    const settlement = await (0, settlement_repository_1.createSettlement)({
        winningBidId: bid.bid_id,
        winnerAccountId: account.account_id,
        slotId: slot.slot_id,
        settlementAmount: Number(bid.bid_amount),
    });
    console.log("✅ Settlement Created");
    console.log(settlement);
}
main().catch(console.error);
//# sourceMappingURL=test-settlement.js.map