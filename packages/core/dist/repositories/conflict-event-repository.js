"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConflictEvent = createConflictEvent;
exports.getConflictMetrics = getConflictMetrics;
const client_1 = require("@/lib/dsql/client");
async function createConflictEvent(input) {
    const result = await (0, client_1.query)(`
    INSERT INTO conflict_events (
      slot_id,
      competing_bid_count,
      retry_count,
      resolved
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `, [
        input.slotId,
        input.competingBidCount,
        input.retryCount,
        input.resolved ?? false,
    ]);
    return result.rows[0];
}
async function getConflictMetrics() {
    const result = await (0, client_1.query)(`
    SELECT
      COUNT(*) AS total_conflicts,
      COALESCE(SUM(retry_count), 0) AS total_retries,
      COALESCE(AVG(retry_count), 0) AS average_retries,
      COUNT(*) FILTER (WHERE resolved = true) AS resolved_conflicts,
      COUNT(*) FILTER (
        WHERE created_at >= NOW() - INTERVAL '1 hour'
      ) AS conflicts_last_hour,
      MAX(created_at) AS latest_conflict
    FROM conflict_events
  `);
    const row = result.rows[0];
    return {
        totalConflicts: Number(row.total_conflicts),
        totalRetries: Number(row.total_retries),
        averageRetries: Number(row.average_retries),
        resolvedConflicts: Number(row.resolved_conflicts),
        resolutionRate: row.total_conflicts > 0
            ? ((row.resolved_conflicts /
                row.total_conflicts) *
                100).toFixed(2)
            : "0.00",
        conflictsLastHour: Number(row.conflicts_last_hour),
        latestConflict: row.latest_conflict,
    };
}
//# sourceMappingURL=conflict-event-repository.js.map