export interface CreateBidInput {
    accountId: string;
    slotId: string;
    bidAmount: number;
    region: string;
}
export declare function createBid(input: CreateBidInput): Promise<any>;
export declare function getRecentBids(limit?: number): Promise<any[]>;
export declare function getLatestBid(): Promise<any>;
//# sourceMappingURL=bid-repository.d.ts.map