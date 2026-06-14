export interface CreateSettlementInput {
    winningBidId: string;
    winnerAccountId: string;
    slotId: string;
    settlementAmount: number;
}
export declare function createSettlement(input: CreateSettlementInput): Promise<any>;
export declare function getRecentSettlements(limit?: number): Promise<any[]>;
export declare function createSettlementWithRetry(input: CreateSettlementInput): Promise<any>;
//# sourceMappingURL=settlement-repository.d.ts.map