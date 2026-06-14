export declare function saveSimulationRun(simulation: {
    totalBids: number;
    averageBid: number;
    averageLatency: number;
    averageQualityScore: number;
    winningRegion: string;
    winningBid: number;
    settlementStatus: string;
}): Promise<any>;
export declare function getRecentSimulationRuns(limit?: number): Promise<any>;
//# sourceMappingURL=simulation-repository.d.ts.map