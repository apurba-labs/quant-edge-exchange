import { Bid } from "./bid-generator";
export declare function settleBid(bid: Bid): Promise<{
    settled: boolean;
    winningBid: number;
    settlementTime: Date;
}>;
//# sourceMappingURL=settlement-runner.d.ts.map