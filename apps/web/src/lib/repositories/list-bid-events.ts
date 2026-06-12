import {
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import {
  getDynamoClient,
  BID_EVENTS_TABLE,
} from "@/lib/dynamodb/client";

async function run() {
    const client = getDynamoClient();

    const result = await client.send(
            new ScanCommand({
                TableName:
                BID_EVENTS_TABLE,
            })
        );

    console.log( result.Items );
}

run();