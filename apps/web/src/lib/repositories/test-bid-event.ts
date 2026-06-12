import {
  saveBidEvent,
} from "./bid-event-repository";

async function test() {
  await saveBidEvent({
    bidId: crypto.randomUUID(),
    slotId: crypto.randomUUID(),
    region: "us-east-1",
    bidAmount: 125.5,
  });

  console.log( "✅ Bid event stored in DynamoDB" );
}

test();