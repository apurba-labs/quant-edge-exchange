"use client";
import React from "react";

type Settlement = {
  settlement_id: string;
  settlement_amount: string;
  settled_at: string;
};

interface RecentSettlementsProps {
  settlements: Settlement[];
  paginatedSettlements: Settlement[];
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}

export function RecentSettlements({
  settlements,
  paginatedSettlements,
  currentPage,
  setPage,
  itemsPerPage,
}: RecentSettlementsProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col justify-between h-full">
      
      <div>
        <h2 className="text-xl font-extrabold mb-5 text-gray-900 dark:text-white uppercase tracking-tight">
          Aurora DSQL Settlement Ledger
        </h2>

        {/* Header Row - Stable Grid Alignment */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
          <div className="flex-1 text-left">Settlement Amount</div>
          <div className="flex-1 text-right">Timestamp</div>
        </div>

        {/* Data List Rows Mapping Paginated Array */}
        <div className="w-full divide-y divide-gray-100 dark:divide-gray-700/50">
          {paginatedSettlements.map((settlement) => (
            <div
              key={settlement.settlement_id}
              className="w-full flex items-center justify-between py-3.5 text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors px-1"
            >
              {/* Settlement Financial Value */}
              <div className="flex-1 text-left font-extrabold text-gray-900 dark:text-white font-mono text-xs">
                ${parseFloat(settlement.settlement_amount).toFixed(4)}
              </div>

              {/* Formatted to High-Frequency Time Format to look sleek */}
              <div className="flex-1 text-right text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                {settlement.settled_at 
                  ? new Date(settlement.settled_at).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
                  : "00:00:00"}
              </div>
            </div>
          ))}

          {settlements.length === 0 && (
            <p className="text-gray-400 dark:text-gray-500 py-8 text-center text-xs font-bold uppercase tracking-wider">
              No recent settlement transactions found.
            </p>
          )}
        </div>
      </div>

      {/* Embedded Operational Pagination Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Page {currentPage} of {Math.max(1, Math.ceil(settlements.length / itemsPerPage))}
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
            onClick={() => setPage(p => p * itemsPerPage < settlements.length ? p + 1 : p)} 
            disabled={currentPage * itemsPerPage >= settlements.length} 
            className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}