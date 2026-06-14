"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSimulationRun = saveSimulationRun;
exports.getRecentSimulationRuns = getRecentSimulationRuns;
const client_1 = require("../dsql/client");
async function saveSimulationRun(simulation) {
    return (0, client_1.query)(`
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
        `, [
        simulation.totalBids,
        simulation.averageBid,
        simulation.averageLatency,
        simulation.averageQualityScore,
        simulation.winningRegion,
        simulation.winningBid,
        simulation.settlementStatus,
    ]);
}
async function getRecentSimulationRuns(limit = 20) {
    const result = await (0, client_1.query)(`
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
        `, [limit]);
    return result.rows;
}
//# sourceMappingURL=simulation-repository.js.map