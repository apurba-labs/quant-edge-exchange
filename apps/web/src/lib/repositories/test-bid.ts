import { createBid } from "./bid-repository";
import { getRandomAccount } from "./account-repository";
import { getRandomSlot } from "./slot-repository";

async function main() {
  const account = await getRandomAccount();
  const slot = await getRandomSlot();

  const bid = await createBid({
    accountId: account.account_id,
    slotId: slot.slot_id,
    bidAmount: Number(slot.base_price) + Math.random() * 5,
    region: "us-east-1",
  });

  console.log("✅ Bid Created");
  console.log(bid);
}

main();