"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatformMetrics = getPlatformMetrics;
exports.getWinningRegionStats = getWinningRegionStats;
const client_1 = require("@/lib/dsql/client");
async function getPlatformMetrics() {
    const result = await (0, client_1.query)(`
    SELECT
      COUNT(*) as total_runs,
      AVG(average_latency) as avg_latency,
      AVG(average_quality_score) as avg_quality_score
    FROM simulation_runs
  `);
    const metrics = result.rows[0];
    return {
        totalRuns: Number(metrics.total_runs || 0),
        averageLatency: Number(metrics.avg_latency || 0),
        averageQualityScore: Number(metrics.avg_quality_score || 0),
    };
}
async function getWinningRegionStats() {
    const result = await (0, client_1.query)(`
        SELECT
        winning_region,
        COUNT(*) as total
        FROM simulation_runs
        GROUP BY winning_region
        ORDER BY total DESC
    `);
    return result.rows;
}
//# sourceMappingURL=metrics-repository.js.map