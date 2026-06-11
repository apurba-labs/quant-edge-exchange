type SimulationRun = {
  id: string;
  total_bids: number;
  winning_region: string;
  winning_bid: string;
  settlement_status: string;
  created_at: string;
};

export function RecentSimulations({ runs }: { runs: SimulationRun[] }) {
  return (
    <div className="w-full mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Recent Simulation Runs
      </h2>

      {/* Header Row: Forced Full Width via Flexbox */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">
        <div className="flex-[2_2_0%] min-w-0">Created</div>
        <div className="flex-1 text-left">Bids</div>
        <div className="flex-1 text-left">Region</div>
        <div className="flex-1 text-left">Winning Bid</div>
        <div className="flex-1 text-right">Status</div>
      </div>

      {/* Data Rows Container */}
      <div className="w-full divide-y divide-gray-100 dark:divide-gray-700/50">
        {runs.map((run) => (
          <div
            key={run.id}
            className="w-full flex items-center justify-between py-4 text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors px-2"
          >
            {/* Created Timestamp (Allocated extra flex growth space) */}
            <div className="flex-[2_2_0%] min-w-0 text-gray-900 dark:text-gray-100 font-medium whitespace-nowrap">
              {new Date(run.created_at).toLocaleString()}
            </div>

            {/* Total Bids */}
            <div className="flex-1 text-left text-gray-500 dark:text-gray-400 font-mono">
              {run.total_bids}
            </div>

            {/* Winning Region */}
            <div className="flex-1 text-left">
              <span className="font-mono text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded">
                {run.winning_region}
              </span>
            </div>

            {/* Winning Bid Amount */}
            <div className="flex-1 text-left font-semibold text-gray-900 dark:text-white font-mono">
              ${parseFloat(run.winning_bid).toFixed(4)}
            </div>

            {/* Settlement Status */}
            <div className="flex-1 text-right">
              <span
                className={`inline-flex items-center text-xs font-bold ${
                  run.settlement_status === "SUCCESS"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                ● {run.settlement_status}
              </span>
            </div>
          </div>
        ))}

        {runs.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 py-8 text-center font-medium">
            No simulation history found.
          </p>
        )}
      </div>
    </div>
  );
}