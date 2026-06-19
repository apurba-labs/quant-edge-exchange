"use client";
import React from "react";

type Bid = {
  bid_id: string;
  bid_amount: string;
  region: string;
  bid_status: string;
  created_at: string;
};

interface RecentBidsProps {
  bids: Bid[];
  paginatedBids: Bid[];
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}

export function RecentBids({ bids, paginatedBids, currentPage, setPage, itemsPerPage }: RecentBidsProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col justify-between h-full">
      
      <div>
        <h2 className="text-xl font-extrabold mb-5 text-gray-900 dark:text-white uppercase tracking-tight">
          Recent DynamoDB Bid Events
        </h2>

        {/* Header Row - Stable Distribution */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
          <div className="w-[20%] text-left">Region</div>
          <div className="w-[25%] text-left">Amount</div>
          <div className="w-[25%] text-left">Status</div>
          <div className="w-[30%] text-right">Timestamp</div>
        </div>

        {/* Data Rows Mapping Paginated Array */}
        <div className="w-full divide-y divide-gray-100 dark:divide-gray-700/50">
          {paginatedBids.map((bid) => (
            <div
              key={bid.bid_id}
              className="w-full flex items-center justify-between py-3.5 text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors px-1"
            >
              <div className="w-[20%] text-left">
                <span className="font-mono text-[10px] font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded border border-gray-200/40 dark:border-gray-600/30">
                  {bid.region}
                </span>
              </div>

              <div className="w-[25%] text-left font-semibold text-gray-900 dark:text-white font-mono text-xs">
                ${parseFloat(bid.bid_amount).toFixed(4)}
              </div>

              <div className="w-[25%] text-left">
                <span className={`inline-flex items-center text-xs font-bold tracking-wide uppercase ${
                  bid.bid_status === "SUCCESS" || bid.bid_status === "ACCEPTED"
                    ? "text-emerald-500"
                    : "text-rose-500"
                }`}>
                  <span className="mr-1.5 text-[8px]">●</span>{bid.bid_status}
                </span>
              </div>

              {/* Formatted to High-Frequency Time Format to look sleek */}
              <div className="w-[30%] text-right text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                {bid.created_at 
                  ? new Date(bid.created_at).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
                  : "00:00:00"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Operational Pagination Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Page {currentPage} of {Math.max(1, Math.ceil(bids.length / itemsPerPage))}
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
            onClick={() => setPage(p => p * itemsPerPage < bids.length ? p + 1 : p)} 
            disabled={currentPage * itemsPerPage >= bids.length} 
            className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-all cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}