import { getRandomAccount } from "./account-repository";
import { getRandomSlot } from "./slot-repository";
import { createBid } from "./bid-repository";
import { createSettlement } from "./settlement-repository";

async function main() {
  const account = await getRandomAccount();
  const slot = await getRandomSlot();

  const bid = await createBid({
    accountId: account.account_id,
    slotId: slot.slot_id,
    bidAmount: Number(slot.base_price) + 10,
    region: "eu-west-1",
  });

  const settlement = await createSettlement({
    winningBidId: bid.bid_id,
    winnerAccountId: account.account_id,
    slotId: slot.slot_id,
    settlementAmount: Number(bid.bid_amount),
  });

  console.log("✅ Settlement Created");
  console.log(settlement);
}

main().catch(console.error);