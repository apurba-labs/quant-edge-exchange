import { Bid } from "./bid-generator";
export declare function runSimulation(): Promise<{
    totalBids: number;
    averageBid: number;
    winningBid: Bid;
    settlement: {
        settled: boolean;
        winningBid: number;
        settlementTime: Date;
    };
    averageLatency: number;
    averageQualityScore: number;
    generatedAt: Date;
    databasePersisted: boolean;
}>;
//# sourceMappingURL=simulator.d.ts.map