type Bid = {
  bid_id: string;
  bid_amount: string;
  region: string;
  bid_status: string;
  created_at: string;
};

export function RecentBids({ bids }: { bids: Bid[] }) {
  return (
    <div className="w-full mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Recent Bids
      </h2>

      {/* Header Row - Fixed percentage distribution */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">
        <div className="w-[20%] text-left">Region</div>
        <div className="w-[20%] text-left">Amount</div>
        <div className="w-[25%] text-left">Status</div>
        <div className="w-[35%] text-right">Created</div>
      </div>

      {/* Data Rows - Matching exact same percentage distribution */}
      <div className="w-full divide-y divide-gray-100 dark:divide-gray-700/50">
        {bids.map((bid) => (
          <div
            key={bid.bid_id}
            className="w-full flex items-center justify-between py-4 text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors px-2"
          >
            <div className="w-[20%] text-left">
              <span className="font-mono text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded">
                {bid.region}
              </span>
            </div>

            <div className="w-[20%] text-left font-semibold text-gray-900 dark:text-white font-mono">
              ${parseFloat(bid.bid_amount).toFixed(4)}
            </div>

            <div className="w-[25%] text-left">
              <span className={`inline-flex items-center text-xs font-bold ${
                bid.bid_status === "SUCCESS" || bid.bid_status === "ACCEPTED"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}>
                ● {bid.bid_status}
              </span>
            </div>

            <div className="w-[35%] text-right text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
              {new Date(bid.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}