"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_1 = require("@/lib/dynamodb/client");
async function run() {
    const client = (0, client_1.getDynamoClient)();
    const result = await client.send(new lib_dynamodb_1.ScanCommand({
        TableName: client_1.BID_EVENTS_TABLE,
    }));
    console.log(result.Items);
}
run();
//# sourceMappingURL=list-bid-events.js.map