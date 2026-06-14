export interface CreateConflictEventInput {
    slotId: string;
    competingBidCount: number;
    retryCount: number;
    resolved?: boolean;
}
export declare function createConflictEvent(input: CreateConflictEventInput): Promise<any>;
export declare function getConflictMetrics(): Promise<{
    totalConflicts: number;
    totalRetries: number;
    averageRetries: number;
    resolvedConflicts: number;
    resolutionRate: string;
    conflictsLastHour: number;
    latestConflict: any;
}>;
//# sourceMappingURL=conflict-event-repository.d.ts.map