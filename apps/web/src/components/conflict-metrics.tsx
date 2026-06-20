"use client";
import React from "react";

interface ConflictMetrics {
  totalConflicts: number;
  totalRetries: number;
  averageRetries: number;
  resolvedConflicts: number;
  resolutionRate: number;
  conflictsLastHour:number,
  latestConflict:Date,
}

export function ConflictMetrics({ metrics }: { metrics: ConflictMetrics | null }) {
  if (!metrics) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-gray-400 h-full flex items-center justify-center">
        Loading conflict metrics...
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 flex flex-col justify-start gap-3 shadow-sm">
      
      {/* Row 1: Title sits cleanly at the top left */}
      <div className="w-full text-left mb-5">
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
          Aurora DSQL OCC Engine
        </h2>
      </div>

      {/* Row 2: Cards span full width across the bottom area */}
      <div className="w-full grid grid-cols-5 gap-3">
        <MetricCard
          title="CONFLICTS"
          value={metrics.totalConflicts}
        />
        <MetricCard
          title="RETRIES"
          value={metrics.totalRetries}
        />
        <MetricCard
          title="AVG RETRY"
          value={metrics.averageRetries.toFixed(2)}
        />
        <MetricCard
          title="RESOLVED"
          value={metrics.resolvedConflicts}
        />
        <MetricCard
          title="RESOLUTION RATE"
          value={`${metrics.resolutionRate}%`}
          isHighlighted={metrics.resolutionRate === 100}
        />
        <MetricCard
          title="CONFLICTS LAST HOUR:"
          value={metrics.conflictsLastHour}
        />
        <MetricCard
          title="LATEST CONFLICT:"
          value={metrics.latestConflict
          ? new Date(
              metrics.latestConflict
            ).toLocaleString()
          : "N/A"}
          isHighlighted={metrics.resolutionRate === 100}
        />
      </div>
    </div>
  );
}
function MetricCard({
  title,
  value,
  isHighlighted = false,
}: {
  title: string;
  value: string | number;
  isHighlighted?: boolean;
}) {
  return (
    /* Now that cards span full width, they have plenty of room to breathe */
    <div className="w-full aspect-[4/5] md:aspect-square rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col justify-between p-3 text-center">
      
      {/* Top Header Label */}
      <div className="h-6 flex items-center justify-center">
        <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-tight leading-tight w-full">
          {title}
        </p>
      </div>

      {/* Main Value Display */}
      <div className="flex-1 flex items-center justify-center mt-1">
        <p className={`text-xl md:text-2xl font-extrabold tracking-tight ${
          isHighlighted ? "text-emerald-500" : "text-gray-900"
        }`}>
          {value}
        </p>
      </div>
    </div>
  );
}
