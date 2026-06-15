import {
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

import {
  getDynamoClient,
  BID_EVENTS_TABLE,
} from "@/lib/dynamodb/client";

export async function saveBidEvent({
  bidId,
  slotId,
  region,
  bidAmount,
}: {
  bidId: string;
  slotId: string;
  region: string;
  bidAmount: number;
}) {
  const client = getDynamoClient();

  const timestamp = new Date().toISOString();

  await client.send(
    new PutCommand({
      TableName: BID_EVENTS_TABLE,
      Item: {
            PK: `SLOT#${slotId}`,
            SK: `REGION#${region}` + `#BID#${bidId}`,
            bidId,
            slotId,
            region,
            bidAmount,
            timestamp,
            ttl:Math.floor( Date.now() / 1000 ) + 60 * 60 * 24,
        },
    })
  );

  return true;
}