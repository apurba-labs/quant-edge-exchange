"use client";
import React from "react";

interface ConflictMetrics {
  totalConflicts: number;
  totalRetries: number;
  averageRetries: number;
  resolvedConflicts: number;
  resolutionRate: number;
  conflictsLastHour: number;
  latestConflict: Date;
}

export function ConflictMetrics({ metrics }: { metrics: ConflictMetrics | null }) {
  if (!metrics) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-400 h-full flex items-center justify-center dark:bg-gray-800 dark:border-gray-700">
        Loading conflict metrics...
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 flex flex-col justify-start gap-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      
      <div className="w-full text-left">
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Aurora DSQL OCC Engine
        </h2>
        <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mt-1">
          Serialization Conflict Recovery Metrics
        </p>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-4 py-2">
        <MetricItem title="Conflicts" value={metrics.totalConflicts} />
        <MetricItem title="Retries" value={metrics.totalRetries} />
        <MetricItem title="Avg Retry" value={metrics.averageRetries.toFixed(2)} />
        <MetricItem title="Resolved" value={metrics.resolvedConflicts} />
        <MetricItem
          title="Resolution Rate"
          value={`${metrics.resolutionRate}%`}
          isHighlighted={metrics.resolutionRate === 100}
        />
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 items-start sm:items-center justify-between">
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Last Hour:</span>
          <span className="text-base font-extrabold text-gray-900 dark:text-white font-mono">
            {metrics.conflictsLastHour}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Latest Conflict:</span>
          <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-lg border border-blue-100 dark:border-blue-900 shadow-inner">
            {metrics.latestConflict
              ? new Date(metrics.latestConflict).toLocaleDateString() + ' ' + new Date(metrics.latestConflict).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
              : "00:00:00 (NO CONFLICTS)"}
          </span>
        </div>

      </div>
    </div>
  );
}

{/* Minimal Item layout without the outer square boxes */}
function MetricItem({
  title,
  value,
  isHighlighted = false,
}: {
  title: string;
  value: string | number;
  isHighlighted?: boolean;
}) {
  return (
    <div className="flex flex-col justify-start text-left sm:text-center">
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
        {title}
      </p>
      <p className={`text-xl md:text-2xl font-black tracking-tight ${
        isHighlighted ? "text-emerald-500" : "text-gray-900 dark:text-white"
      }`}>
        {value}
      </p>
    </div>
  );
}