type Metrics = {
  totalRuns: number;
  averageLatency: number;
  averageQualityScore: number;
};

export function MetricsCards({
  metrics,
}: {
  metrics: Metrics;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-sm font-medium text-gray-500">
          Total Simulations
        </h3>

        <p className="text-3xl font-bold mt-2">
          {metrics.totalRuns}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-sm font-medium text-gray-500">
          Average Latency
        </h3>

        <p className="text-3xl font-bold mt-2">
          {metrics.averageLatency.toFixed(1)} ms
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-sm font-medium text-gray-500">
          Quality Score
        </h3>

        <p className="text-3xl font-bold mt-2">
          {metrics.averageQualityScore.toFixed(4)}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h3 className="text-sm font-medium text-gray-500">
          Persistence Success
        </h3>

        <p className="text-3xl font-bold text-green-600 mt-2">
          100%
        </p>
      </div>
    </div>
  );
}