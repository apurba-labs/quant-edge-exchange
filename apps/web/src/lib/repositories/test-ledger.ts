import { getRandomAccount } from "./account-repository";
import { getRandomSlot } from "./slot-repository";
import { createLedgerEntry } from "./ledger-repository";

async function main() {
  const account = await getRandomAccount();
  const slot = await getRandomSlot();

  const ledgerEntry =
    await createLedgerEntry({
      accountId: account.account_id,
      slotId: slot.slot_id,
      amount: 125.75,
      transactionType: "SETTLEMENT",
      originRegion: "us-east-1",
    });

  console.log("✅ Ledger Entry Created");
  console.log(ledgerEntry);
}

main().catch(console.error);