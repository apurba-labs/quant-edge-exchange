"use client";

import React, { useState } from "react";

export default function SimulatorPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleRunSimulation() {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/simulations", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(
          `Simulation failed: ${response.statusText}`
        );
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error(error);

      setResult({
        error: true,
        message:
          "Failed to run simulation. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto p-6 md:p-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            Quant Edge Exchange
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Simulate regional bid activity, settlement
            workflows, and exchange performance metrics.
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

            <div>
              <h2 className="text-2xl font-semibold">
                Bid Simulation Engine
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Generate synthetic exchange traffic and
                settlement outcomes across global regions.
              </p>
            </div>

            <button
              onClick={handleRunSimulation}
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Running Simulation..."
                : "Run Simulation"}
            </button>
          </div>
        </div>

        {/* Error State */}
        {result?.error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 mb-8">
            {result.message}
          </div>
        )}

        {/* Results */}
        {result && !result.error && (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <p className="text-sm text-gray-500">
                  Total Bids
                </p>

                <p className="text-3xl font-bold mt-2">
                  {result.totalBids}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <p className="text-sm text-gray-500">
                  Average Bid
                </p>

                <p className="text-3xl font-bold mt-2">
                  ${result.averageBid}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <p className="text-sm text-gray-500">
                  Winning Region
                </p>

                <p className="text-xl font-bold mt-2">
                  {result.winningBid.region}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <p className="text-sm text-gray-500">
                  Average Latency
                </p>

                <p className="text-xl font-bold mt-2">
                  {result.averageLatency}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <p className="text-sm text-gray-500">
                  Average Quality Score
                </p>

                <p className="text-xl font-bold mt-2">
                  {result.averageQualityScore}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <p className="text-sm text-gray-500">
                  Settlement Status
                </p>

                <p className="text-xl font-bold text-green-500 mt-2">
                  {result.settlement.settled
                    ? "SUCCESS"
                    : "FAILED"}
                </p>
              </div>

            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Winning Bid */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Winning Bid
                </h3>

                <div className="space-y-3 text-sm">

                  <div>
                    <strong>Bid ID:</strong>
                    <p className="break-all text-gray-500">
                      {result.winningBid.bidId}
                    </p>
                  </div>

                  <div>
                    <strong>Account ID:</strong>
                    <p>{result.winningBid.accountId}</p>
                  </div>

                  <div>
                    <strong>Slot ID:</strong>
                    <p>{result.winningBid.slotId}</p>
                  </div>

                  <div>
                    <strong>Region:</strong>
                    <p>{result.winningBid.region}</p>
                  </div>

                  <div>
                    <strong>Bid Amount:</strong>
                    <p>
                      $
                      {result.winningBid.bidAmount.toFixed(4)}
                    </p>
                  </div>
                  <div>
                    <strong>Latency:</strong>
                    <p>
                      {result.winningBid.latencyMs} ms
                    </p>
                  </div>
                  <div>
                    <strong>Jitter:</strong>
                    <p>
                      {result.winningBid.jitterMs} ms
                    </p>
                  </div>
                  <div>
                    <strong>Quality Score:</strong>
                    <p>
                      {result.winningBid.qualityScore.toFixed(4)}
                    </p>
                  </div>

                </div>
              </div>

              {/* Settlement */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Settlement Details
                </h3>

                <div className="space-y-3 text-sm">

                  <div>
                    <strong>Status:</strong>
                    <p>
                      {result.settlement.settled
                        ? "Completed"
                        : "Pending"}
                    </p>
                  </div>

                  <div>
                    <strong>Winning Bid:</strong>
                    <p>
                      $
                      {result.settlement.winningBid.toFixed(
                        4
                      )}
                    </p>
                  </div>

                  <div>
                    <strong>Settlement Time:</strong>
                    <p>
                      {new Date(
                        result.settlement.settlementTime
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <strong>Simulation Generated:</strong>
                    <p>
                      {new Date(
                        result.generatedAt
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Raw JSON Viewer */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Simulation Payload
              </h3>

              <pre className="overflow-auto text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                {JSON.stringify(
                  result,
                  null,
                  2
                )}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}