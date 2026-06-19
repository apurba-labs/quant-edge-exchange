"use client";
import React from "react";

type SimulationRun = {
  id: string;
  total_bids: number;
  winning_region: string;
  winning_bid: string;
  settlement_status: string;
  created_at: string;
};

interface RecentSimulationsProps {
  runs: SimulationRun[];
  paginatedSimulations: SimulationRun[];
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}

export function RecentSimulations({
  runs,
  paginatedSimulations,
  currentPage,
  setPage,
  itemsPerPage,
}: RecentSimulationsProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col justify-between h-full">
      
      <div>
        <h2 className="text-xl font-extrabold mb-5 text-gray-900 dark:text-white uppercase tracking-tight">
          Simulation Runs
        </h2>

        {/* Header Row */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
          <div className="w-[20%] text-left">Bids</div>
          <div className="w-[25%] text-left">Region</div>
          <div className="w-[25%] text-left">Winning Bid</div>
          <div className="w-[15%] text-left">Status</div>
          <div className="w-[15%] text-right">Time</div>
        </div>

        {/* Data Rows */}
        <div className="w-full divide-y divide-gray-100 dark:divide-gray-700/50">
          {paginatedSimulations.map((run) => (
            <div
              key={run.id}
              className="w-full flex items-center justify-between py-3.5 text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors px-1"
            >
              <div className="w-[20%] text-left text-gray-500 dark:text-gray-400 font-mono text-xs">
                {run.total_bids}
              </div>

              <div className="w-[25%] text-left">
                <span className="font-mono text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded border border-gray-200/40 dark:border-gray-600/30">
                  {run.winning_region}
                </span>
              </div>

              <div className="w-[25%] text-left font-semibold text-gray-900 dark:text-white font-mono text-xs">
                ${parseFloat(run.winning_bid).toFixed(4)}
              </div>

              <div className="w-[15%] text-left">
                <span className={`inline-flex items-center text-xs font-bold tracking-wide uppercase ${
                  run.settlement_status === "SUCCESS"
                    ? "text-emerald-500"
                    : "text-rose-500"
                }`}>
                  {run.settlement_status}
                </span>
              </div>

              <div className="w-[15%] text-right text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                {run.created_at 
                  ? new Date(run.created_at).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
                  : "00:00:00"}
              </div>
            </div>
          ))}

          {runs.length === 0 && (
            <p className="text-gray-400 dark:text-gray-500 py-8 text-center text-xs font-bold uppercase tracking-wider">
              No simulation history found.
            </p>
          )}
        </div>
      </div>

      {/* Embedded Control Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Page {currentPage} of {Math.max(1, Math.ceil(runs.length / itemsPerPage))}
        </span>
        <div className="flex gap-1.5">
          <button 
            onClick={() => setPage(p => Math.max(p - 1, 1))} 
            disabled={currentPage === 1} 
            className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-all cursor-pointer"
          >
            Prev
          </button>
          <button 
            onClick={() => setPage(p => p * itemsPerPage < runs.length ? p + 1 : p)} 
            disabled={currentPage * itemsPerPage >= runs.length} 
            className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}