import {
  getLatestBid,
} from "./bid-repository";

import {
  createSettlementWithRetry,
} from "./settlement-repository";

async function run() {

    const bid = await getLatestBid();

    console.log(
        "Using bid:",
        bid.bid_id
    );

    const payload = {

        winningBidId:
        bid.bid_id,

        winnerAccountId:bid.account_id,

        slotId:bid.slot_id,

        settlementAmount:Number( bid.bid_amount ),
    };

    await Promise.all([
        createSettlementWithRetry(payload),
        createSettlementWithRetry(payload),
        createSettlementWithRetry(payload),
    ]);

    console.log(" ✅ Conflict test completed" );
}

run();