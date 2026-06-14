"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBidEvent = saveBidEvent;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_1 = require("@/lib/dynamodb/client");
async function saveBidEvent({ bidId, slotId, region, bidAmount, }) {
    const client = (0, client_1.getDynamoClient)();
    const timestamp = new Date().toISOString();
    await client.send(new lib_dynamodb_1.PutCommand({
        TableName: client_1.BID_EVENTS_TABLE,
        Item: {
            PK: `SLOT#${slotId}`,
            SK: `REGION#${region}` + `#BID#${bidId}`,
            bidId,
            slotId,
            region,
            bidAmount,
            timestamp,
            ttl: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        },
    }));
    return true;
}
//# sourceMappingURL=bid-event-repository.js.map