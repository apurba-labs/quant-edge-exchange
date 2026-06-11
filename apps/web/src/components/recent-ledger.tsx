type LedgerEntry = {
  transaction_id: string;
  amount: string;
  transaction_type: string;
  origin_region: string;
  created_at: string;
};

export function RecentLedger({ entries }: { entries: LedgerEntry[] }) {
  return (
    <div className="w-full mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Ledger Activity
      </h2>

      {/* Header Row - Fixed percentage distribution */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">
        <div className="w-[25%] text-left">Type</div>
        <div className="w-[20%] text-left">Amount</div>
        <div className="w-[20%] text-left">Region</div>
        <div className="w-[35%] text-right">Created</div>
      </div>

      {/* Data Rows - Matching exact same percentage distribution */}
      <div className="w-full divide-y divide-gray-100 dark:divide-gray-700/50">
        {entries.map((entry) => (
          <div
            key={entry.transaction_id}
            className="w-full flex items-center justify-between py-4 text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors px-2"
          >
            <div className="w-[25%] text-left">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                entry.transaction_type.includes("DEPOSIT") || entry.transaction_type.includes("SUCCESS")
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-indigo-600 dark:text-indigo-400"
              }`}>
                {entry.transaction_type}
              </span>
            </div>

            <div className="w-[20%] text-left font-semibold text-gray-900 dark:text-white font-mono">
              ${parseFloat(entry.amount).toFixed(4)}
            </div>

            <div className="w-[20%] text-left">
              <span className="font-mono text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded">
                {entry.origin_region}
              </span>
            </div>

            <div className="w-[35%] text-right text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
              {new Date(entry.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}