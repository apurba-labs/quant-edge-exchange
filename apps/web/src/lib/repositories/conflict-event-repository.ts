import { query } from "@/lib/dsql/client";

export interface CreateConflictEventInput {
  slotId: string;
  competingBidCount: number;
  retryCount: number;
  resolved?: boolean;
}

export async function createConflictEvent(
  input: CreateConflictEventInput
) {
  const result = await query(
    `
    INSERT INTO conflict_events (
      slot_id,
      competing_bid_count,
      retry_count,
      resolved
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      input.slotId,
      input.competingBidCount,
      input.retryCount,
      input.resolved ?? false,
    ]
  );

  return result.rows[0];
}

export async function getConflictMetrics() {
  const result = await query(`
    SELECT
      COUNT(*) AS total_conflicts,
      COALESCE(
        SUM(retry_count),
        0
      ) AS total_retries,
      COALESCE(
        AVG(retry_count),
        0
      ) AS avg_retries,
      SUM(
        CASE
          WHEN resolved = true
          THEN 1
          ELSE 0
        END
      ) AS resolved_conflicts
    FROM conflict_events
  `);

  const row = result.rows[0];

  return {
    totalConflicts:Number(row.total_conflicts),

    totalRetries:Number(row.total_retries),

    averageRetries:Number(row.avg_retries),

    resolvedConflicts:Number(row.resolved_conflicts),

    resolutionRate:
      row.total_conflicts > 0
        ? Number(
            (
              Number(
                row.resolved_conflicts
              ) /
              Number(
                row.total_conflicts
              ) *
              100
            ).toFixed(2)
          )
        : 0,
  };
}