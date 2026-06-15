import { query } from "@/lib/dsql/client";

export async function saveSimulationRun(
    simulation: {
        totalBids: number;
        averageBid: number;
        averageLatency: number;
        averageQualityScore: number;
        winningRegion: string;
        winningBid: number;
        settlementStatus: string;
    }
) {
    return query(
        `
        INSERT INTO simulation_runs (
            total_bids,
            average_bid,
            average_latency,
            average_quality_score,
            winning_region,
            winning_bid,
            settlement_status
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        `,
        [
            simulation.totalBids,
            simulation.averageBid,
            simulation.averageLatency,
            simulation.averageQualityScore,
            simulation.winningRegion,
            simulation.winningBid,
            simulation.settlementStatus,
        ]
    );
}

export async function getRecentSimulationRuns( limit: number = 20 ) {
    const result = await query(
        `
        SELECT
        id,
        total_bids,
        average_bid,
        average_latency,
        average_quality_score,
        winning_region,
        winning_bid,
        settlement_status,
        created_at
        FROM simulation_runs
        ORDER BY created_at DESC
        LIMIT $1
        `,
        [limit]
    );

    return result.rows;
}