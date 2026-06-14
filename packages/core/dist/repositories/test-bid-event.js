"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bid_event_repository_1 = require("./bid-event-repository");
async function test() {
    await (0, bid_event_repository_1.saveBidEvent)({
        bidId: crypto.randomUUID(),
        slotId: crypto.randomUUID(),
        region: "us-east-1",
        bidAmount: 125.5,
    });
    console.log("✅ Bid event stored in DynamoDB");
}
test();
//# sourceMappingURL=test-bid-event.js.map