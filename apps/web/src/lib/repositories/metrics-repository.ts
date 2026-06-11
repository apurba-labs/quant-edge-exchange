import { query } from "@/lib/dsql/client";

export async function getPlatformMetrics() {
  const result = await query(`
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
    averageQualityScore: Number( metrics.avg_quality_score || 0 ),
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