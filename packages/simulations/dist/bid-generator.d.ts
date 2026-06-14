import { TrafficProfile } from "./traffic-profiles";
export interface Bid {
    bidId: string;
    region: string;
    bidAmount: number;
    latencyMs: number;
    jitterMs: number;
    qualityScore: number;
    timestamp: Date;
    accountId?: string;
    slotId?: string;
    persistedBidId?: string;
}
export declare function generateBid(profile: TrafficProfile): Bid;
//# sourceMappingURL=bid-generator.d.ts.map