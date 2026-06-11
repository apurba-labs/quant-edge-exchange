type Settlement = {
  settlement_id: string;
  settlement_amount: string;
  settled_at: string;
};

export function RecentSettlements({ settlements }: { settlements: Settlement[] }) {
  return (
    <div className="w-full mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Recent Settlements
      </h2>

      {/* Header Row: Spread perfectly across the panel canvas */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">
        <div className="flex-1 text-left">Settlement Amount</div>
        <div className="flex-[2_2_0%] text-right">Settled At</div>
      </div>

      {/* Data List Rows */}
      <div className="w-full divide-y divide-gray-100 dark:divide-gray-700/50">
        {settlements.map((settlement) => (
          <div
            key={settlement.settlement_id}
            className="w-full flex items-center justify-between py-4 text-sm hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors px-2"
          >
            {/* Settlement Financial Value */}
            <div className="flex-1 text-left font-bold text-gray-900 dark:text-white font-mono text-base">
              ${parseFloat(settlement.settlement_amount).toFixed(4)}
            </div>

            {/* Settled Time Stamp (Extra width factor pushes it beautifully to the right edge) */}
            <div className="flex-[2_2_0%] text-right text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
              {new Date(settlement.settled_at).toLocaleString()}
            </div>
          </div>
        ))}

        {settlements.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 py-8 text-center font-medium">
            No recent settlement transactions found.
          </p>
        )}
      </div>
    </div>
  );
}