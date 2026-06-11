type RegionStat = {
  winning_region: string;
  total: string;
};

export function WinningRegion({
  regions,
}: {
  regions: RegionStat[];
}) {
  const totalWins = regions.reduce(
    (sum, region) => sum + Number(region.total),
    0
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        Winning Region Distribution
      </h2>

      <div className="space-y-5">
        {regions.map((region) => {
          const wins = Number(region.total);

          const percentage =
            totalWins > 0
              ? ((wins / totalWins) * 100).toFixed(1)
              : "0";

          return (
            <div
              key={region.winning_region}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {region.winning_region}
                </span>

                <span className="text-sm text-gray-500">
                  {wins} wins ({percentage}%)
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}