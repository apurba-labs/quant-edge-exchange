"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bid_repository_1 = require("./bid-repository");
const account_repository_1 = require("./account-repository");
const slot_repository_1 = require("./slot-repository");
async function main() {
    const account = await (0, account_repository_1.getRandomAccount)();
    const slot = await (0, slot_repository_1.getRandomSlot)();
    const bid = await (0, bid_repository_1.createBid)({
        accountId: account.account_id,
        slotId: slot.slot_id,
        bidAmount: Number(slot.base_price) + Math.random() * 5,
        region: "us-east-1",
    });
    console.log("✅ Bid Created");
    console.log(bid);
}
main();
//# sourceMappingURL=test-bid.js.map