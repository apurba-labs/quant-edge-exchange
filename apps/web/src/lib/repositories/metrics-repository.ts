import { query } from "@/lib/dsql/client";

export async function getPlatformMetrics() {

  const result = await query(`
    SELECT
      COUNT(*) AS total_runs,
      AVG(average_latency) AS avg_latency,
      AVG(average_quality_score) AS avg_quality_score,

      COUNT(*) FILTER (
        WHERE settlement_status = 'SUCCESS'
      ) AS successful_runs

    FROM simulation_runs
  `);

  const metrics = result.rows[0];

  const totalRuns = Number(metrics.total_runs || 0);
  const successfulRuns = Number(metrics.successful_runs || 0);
  const persistenceSuccess = totalRuns === 0 ? 0 :Number(((successfulRuns / totalRuns) *100).toFixed(1));

  return {
    totalRuns,
    averageLatency: Number(metrics.avg_latency || 0),
    averageQualityScore: Number(metrics.avg_quality_score || 0),
    successfulRuns,
    persistenceSuccess:persistenceSuccess,
  };
}
export async function getWinningRegionStats() {
    const result = await query(`
        SELECT
        winning_region,
        COUNT(*) as total
        FROM simulation_runs
        GROUP BY winning_region
        ORDER BY total DESC
    `);

    return result.rows;
}