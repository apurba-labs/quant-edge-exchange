export interface CreateLedgerEntryInput {
    accountId: string;
    slotId?: string;
    amount: number;
    transactionType: string;
    originRegion: string;
}
export declare function createLedgerEntry(input: CreateLedgerEntryInput): Promise<any>;
export declare function getRecentLedgerEntries(limit?: number): Promise<any[]>;
//# sourceMappingURL=ledger-repository.d.ts.map