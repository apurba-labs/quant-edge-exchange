"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_repository_1 = require("./account-repository");
const slot_repository_1 = require("./slot-repository");
const ledger_repository_1 = require("./ledger-repository");
async function main() {
    const account = await (0, account_repository_1.getRandomAccount)();
    const slot = await (0, slot_repository_1.getRandomSlot)();
    const ledgerEntry = await (0, ledger_repository_1.createLedgerEntry)({
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
//# sourceMappingURL=test-ledger.js.map