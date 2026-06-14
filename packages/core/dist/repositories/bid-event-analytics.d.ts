export declare function getIngressAnalytics(): Promise<{
    totalEvents: number;
    eventsLastHour: number;
    topRegion: string;
    topRegionCount: number;
    topSlot: string;
    topSlotCount: number;
    regionDistribution: {
        region: string;
        count: number;
    }[];
    hotSlots: {
        slotId: string;
        count: number;
    }[];
}>;
//# sourceMappingURL=bid-event-analytics.d.ts.map