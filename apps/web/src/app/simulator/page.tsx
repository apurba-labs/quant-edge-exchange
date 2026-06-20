"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import {
  RecentSimulations,
} from "@/components/recent-simulations";

import { RecentBids } from "@/components/recent-bids";
import { RecentSettlements } from "@/components/recent-settlements";
import { RecentLedger } from "@/components/recent-ledger";

import { MetricsCards } from "@/components/metrics-cards";
import { WinningRegion } from "@/components/winning-region";
import { ConflictMetrics } from "@/components/conflict-metrics";
import { useExchangeStatus } from "@/context/exchange-status";

export default function SimulatorPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [bids, setBids] = useState<any[]>([]);
  const [settlements, setSettlements] = useState<any[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<any[]>([]);
  const [conflictMetrics, setConflictMetrics] = useState<any>(null);

  const [metrics, setMetrics] = useState({
    totalRuns: 0,
    averageLatency: 0,
    averageQualityScore: 0,
  });
  const [regions, setRegions] = useState([]);

  const { autoRun, setAutoRun, countdown, setCountdown, setNextRunIn } = useExchangeStatus();

  const AUTO_STOP_AFTER_MS = 60000;

  const [bidsPage, setBidsPage] = useState(1);
  const [settlementsPage, setSettlementsPage] = useState(1);
  const [simulationsPage, setSimulationsPage] = useState(1);
  const [ledgerPage, setLedgerPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  async function loadMetrics() {
    try {
      const response = await fetch("/api/metrics");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log("[v0] Metrics loaded:", data.metrics);
      setMetrics(data.metrics);
      setRegions(data.regions);
    } catch (error) {
      console.error("[v0] Failed to load metrics:", error);
    }
  }

  async function loadHistory() {
    try {
      const response = await fetch( "/api/simulations/history");

      const data = await response.json();

      setHistory(data.data || []);
    } catch (error) {
      console.error(
        "Failed to load simulation history",
        error
      );
    }
  }
  async function loadBids() {
    const response = await fetch("/api/bids");

    const data = await response.json();

    setBids(data.data || []);
  }

  async function loadSettlements() {
    const response = await fetch("/api/settlements");

    const data = await response.json();

    setSettlements(data.data || []);
  }

  async function loadLedger() {
    const response = await fetch("/api/ledger");

    const data = await response.json();

    setLedgerEntries(data.data || []);
  }

  async function loadConflicts() {
    try {
      const response = await fetch("/api/conflicts");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log("[v0] Conflicts loaded:", data);
      setConflictMetrics(data);
    } catch (error) {
      console.error("[v0] Failed to load conflicts:", error);
    }
  }

  const refreshDashboard = useCallback(
    async () => {
      await Promise.all([
        loadHistory(),
        loadBids(),
        loadSettlements(),
        loadLedger(),
        loadMetrics(),
        loadConflicts(),
      ]);
    },
    []
  );

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  useEffect(() => {

    if (!autoRun) {
      return;
    }

    setNextRunIn(15);

    // First run immediately
    handleRunSimulation();

    const countdownTimer = setInterval(() => {

      setNextRunIn((prev:any) => {

        if (prev === null) {
          return null;
        }

        if (prev <= 1) {
          return 15;
        }

        return prev - 1;

      });

    }, 1000);

    const interval = setInterval(() => {
      handleRunSimulation();
    }, 15000);

    const timeout = setTimeout(() => {
      setNextRunIn(null);
      setAutoRun(false);
    }, AUTO_STOP_AFTER_MS);

    return () => {
      clearInterval(countdownTimer);
      clearInterval(interval);
      clearTimeout(timeout);
    };

  }, [autoRun, handleRunSimulation]);

  async function handleRunSimulation() {

    if (loading) {
      return;
    }
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

      await refreshDashboard();

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

  const startLiveExchange = () => {
    setCountdown(3);

    const timer = setInterval(() => {

      setCountdown((prev: any) => {

        if (prev === null) return null;

        if (prev <= 1) {

          clearInterval(timer);

          setCountdown(null);

          setAutoRun(true);

          return null;
        }

        return prev - 1;

      });

    }, 1000);
  };

  const paginatedBids = bids.slice((bidsPage - 1) * ITEMS_PER_PAGE, bidsPage * ITEMS_PER_PAGE);
  const paginatedSettlements = settlements.slice((settlementsPage - 1) * ITEMS_PER_PAGE, settlementsPage * ITEMS_PER_PAGE);
  const paginatedSimulations = history.slice((simulationsPage - 1) * ITEMS_PER_PAGE, simulationsPage * ITEMS_PER_PAGE);
  const paginatedLedger = ledgerEntries.slice((ledgerPage - 1) * ITEMS_PER_PAGE, ledgerPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto p-6 md:p-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            Quant Edge Exchange
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
              Model high-throughput bid ingestion in DynamoDB and authoritative settlement workflows in Aurora DSQL.
          </p>
        </div>

        <div className="w-full mt-6">
          <MetricsCards metrics={metrics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* The Winning Region chart takes 1 part */}
          <div className="lg:col-span-1">
            <WinningRegion regions={regions} />
          </div>
          
          {/* The Aurora DSQL OCC Engine box takes 2 parts, making it significantly wider! */}
          <div className="lg:col-span-2">
            <ConflictMetrics metrics={conflictMetrics} />
          </div>
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
              <a
                href="/ingestion"
                target="_blank"
                className="
                  px-6
                  py-3
                  border
                  rounded-lg
                  font-semibold
                "
              >
                View Ingestion Analytics
              </a>
            <div className="flex flex-col items-start gap-2">
              <button
                onClick={() => {
                  if (autoRun) {
                    setAutoRun(false);
                  } else {
                    startLiveExchange();
                  }
                }}
                disabled={loading || countdown !== null}
                className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:opacity-90 disabled:opacity-50"
              >
                {countdown !== null
                  ? `Starting in ${countdown}...`
                  : autoRun
                  ? "Stop Live Exchange"
                  : "Start Live Exchange"}
              </button>

              {autoRun && (
                <p className="text-sm text-muted-foreground">
                  Auto-run active. Stops automatically after 60 seconds.
                </p>
              )}

              {countdown !== null && (
                <p className="text-sm text-muted-foreground">
                  Exchange simulation will start shortly.
                </p>
              )}
            </div>
            
          </div>
        </div>

        {/* Error State */}
        {result?.error && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl p-4 mb-8">
            {result.message}
          </div>
        )}

        {/* Latest Simulation Result */}
        {result && !result.error && (
          <>
            <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-8 mt-6">
              
              {/* Header Block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="space-y-1">
                  <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                    Latest Simulation Result
                  </h1>
                  <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                    Real-time bid evaluation and Aurora DSQL settlement verification
                  </p>
                </div>

                {/* Persistence State Verification Badge */}
                <div className="flex items-center gap-2.5 bg-gray-50 dark:bg-gray-900/60 px-3.5 py-2 rounded-xl border border-gray-100 dark:border-gray-800 self-start sm:self-center">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      result.databasePersisted ? "bg-emerald-400" : "bg-rose-400"
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${
                      result.databasePersisted ? "bg-emerald-500" : "bg-rose-500"
                    }`}></span>
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                    AURORA DSQL: {result.databasePersisted ? "CONSENSUS COMMITTED" : "CONSENSUS ROLLBACK"}
                  </span>
                </div>
              </div>

              {/* Row 1: High-Parity Minimalist Card Pods */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 py-6 border-b border-gray-100 dark:border-gray-700/60">
                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Bids</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white font-mono">{result.totalBids}</p>
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Avg Bid</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white font-mono">${parseFloat(result.averageBid).toFixed(2)}</p>
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between items-start">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Win Region</p>
                  <span className="text-[11px] font-mono font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">
                    {result.winningBid.region}
                  </span>
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Win Amount</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white font-mono">${result.winningBid.bidAmount.toFixed(4)}</p>
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Latency</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white font-mono">{result.averageLatency}<span className="text-xs font-normal text-gray-400 ml-0.5">ms</span></p>
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Quality Score</p>
                  <p className="text-xl font-black text-gray-900 dark:text-white font-mono">{result.averageQualityScore.toFixed(4)}</p>
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between items-start">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Settlement</p>
                  <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded border ${
                    result.settlement.settled 
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 border-emerald-100 dark:border-emerald-900" 
                      : "bg-rose-50 dark:bg-rose-950/50 text-rose-500 border-rose-100 dark:border-rose-900"
                  }`}>
                    {result.settlement.settled ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
              </div>

              {/* ROW 2: DEEP TRANSACTION DETAILS AUDIT LAYER */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                
                {/* Left Panel: Winning Bid Attributes */}
                <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col justify-start gap-4 h-full">
                  
                  {/* Shaded Console Title Header */}
                  <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black tracking-wider text-gray-400 uppercase px-3 py-2.5 shadow-inner text-left">
                    Winning Bid Attributes
                  </div>

                  {/* Body Content - Built entirely using unified card pods */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-1">
                    <div className="sm:col-span-2 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Bid Identifier</span>
                      <span className="font-mono text-xs text-blue-600 dark:text-blue-400 break-all select-all">{result.winningBid.bidId}</span>
                    </div>

                    <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Account Target</span>
                      <span className="font-mono text-xs font-bold text-gray-900 dark:text-white truncate">{result.winningBid.accountId}</span>
                    </div>

                    <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Slot Allocation</span>
                      <span className="font-mono text-xs font-bold text-gray-900 dark:text-white truncate">{result.winningBid.slotId}</span>
                    </div>

                    <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Network Jitter</span>
                      <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{result.winningBid.jitterMs}ms</span>
                    </div>

                    <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Compute Latency</span>
                      <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">{result.winningBid.latencyMs}ms</span>
                    </div>

                    <div className="sm:col-span-2 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Algorithmic Quality Index</span>
                      <span className="font-mono text-sm font-black text-gray-900 dark:text-white">{result.winningBid.qualityScore.toFixed(6)}</span>
                    </div>
                  </div>

                </div>

                {/* Right Panel: AURORA DSQL SETTLEMENT RECORD */}
                <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 flex flex-col justify-start gap-4 h-full">
                  
                  {/* Shaded Console Title Header */}
                  <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black tracking-wider text-gray-400 uppercase px-3 py-2.5 shadow-inner text-left">
                    AURORA DSQL SETTLEMENT RECORD
                  </div>

                  {/* Body Content - Matching box layout metrics structure */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-1">
                    <div className="sm:col-span-2 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Operational Reconciliation</span>
                      <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded border ${
                        result.settlement.settled 
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border-emerald-100/50" 
                          : "bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-100/50"
                      }`}>
                        {result.settlement.settled ? "Posted Ledger" : "Pending Sync"}
                      </span>
                    </div>

                    <div className="sm:col-span-2 bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-4 flex flex-col justify-center items-center text-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">FINAL SETTLEMENT AMOUNT</span>
                      <span className="font-mono text-2xl font-black text-gray-900 dark:text-white">${result.settlement.winningBid.toFixed(4)}</span>
                    </div>

                    <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">COMMIT TIME</span>
                      <span className="font-mono text-xs font-bold text-gray-600 dark:text-gray-300">
                        {result.settlement.settlementTime
                          ? new Date(result.settlement.settlementTime).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
                          : "00:00:00"}
                      </span>
                    </div>

                    <div className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">SIMULATION TIME</span>
                      <span className="font-mono text-xs font-bold text-gray-600 dark:text-gray-300">
                        {result.generatedAt
                          ? new Date(result.generatedAt).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
                          : "00:00:00"}
                      </span>
                    </div>
                  </div>
                  
                </div>

              </div>

              {/* Row 3: Raw Transaction JSON Log Payload */}
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700/60">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Simulation Transaction Payload (Raw Document Log)
                </h3>
                 
                <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mt-1">
                  Raw Settlement Event
                </p>
                <pre className="overflow-auto text-[11px] bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 max-h-48 font-mono shadow-inner custom-scrollbar">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>

            </div>
          </>
        )}
        
        <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-8 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                Exchange Analytics
              </h1>
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                Real-Time Multi-Region Workload Ingestion & Persistence Telemetry
              </p>
            </div>

            {/* Health Status Indicator */}
            <div className="flex items-center gap-2.5 bg-gray-50 dark:bg-gray-900/60 px-3.5 py-2 rounded-xl border border-gray-100 dark:border-gray-800 self-start sm:self-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                Vercel Edge ── AWS SigV4 ── Aurora DSQL
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <RecentBids 
              bids={bids} 
              paginatedBids={paginatedBids}
              currentPage={bidsPage}
              setPage={setBidsPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />

            <RecentSettlements 
              settlements={settlements}
              paginatedSettlements={paginatedSettlements}
              currentPage={settlementsPage}
              setPage={setSettlementsPage} 
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <RecentSimulations 
              runs={history}
              paginatedSimulations={paginatedSimulations}
              currentPage={simulationsPage}
              setPage={setSimulationsPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />

            <RecentLedger 
              entries={ledgerEntries}
              paginatedLedger={paginatedLedger}
              currentPage={ledgerPage}
              setPage={setLedgerPage}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
