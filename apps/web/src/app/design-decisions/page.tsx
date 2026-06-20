"use client";
import React from "react";
import Link from "next/link";

export default function DesignDecisionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">

      {/* ==================================================================== */}
      {/* 🏛️ HERO SECTION                                                     */}
      {/* ==================================================================== */}
      <section className="text-center space-y-6 mb-8">
        <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 shadow-sm">
          Design Decisions
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white uppercase max-w-4xl mx-auto leading-none">
          Great Systems are Built from Decisions
        </h1>

        <p className="mt-6 text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed uppercase tracking-wide">
          Quant Edge Exchange separates transient traffic from authoritative business truth, allowing each workload to be optimized independently.
        </p>
      </section>

      {/* ==================================================================== */}
      {/* 📊 DECISION 01: DYNAMODB FOR TRAFFIC                                */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
        <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black tracking-wider text-blue-600 dark:text-blue-400 uppercase px-3 py-2.5 shadow-inner text-left flex justify-between items-center">
          <span>Decision 01 // High-Throughput Ingestion</span>
          <span className="font-mono bg-blue-100 dark:bg-blue-900/40 text-blue-600 px-2 py-0.5 rounded text-[9px]">DynamoDB</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight px-1">
          Why DynamoDB for Traffic?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          <div className="space-y-2">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Problem</h3>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
              Millions of bid events can arrive continuously across regions. Most of these records are temporary and do not represent business truth.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Decision</h3>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
              Store transient auction traffic in Amazon DynamoDB.
            </p>
            <div className="space-y-1.5 pt-2 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase border-t border-gray-100 dark:border-gray-800">
              <div>✓ High write throughput</div>
              <div>✓ Horizontal scalability</div>
              <div>✓ Low operational overhead</div>
              <div>✓ Fast regional aggregation</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 📊 DECISION 02: AURORA DSQL FOR SETTLEMENT                          */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
        <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase px-3 py-2.5 shadow-inner text-left flex justify-between items-center">
          <span>Decision 02 // Absolute Consistency</span>
          <span className="font-mono bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 px-2 py-0.5 rounded text-[9px]">Aurora DSQL</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight px-1">
          Why Aurora DSQL for Settlement?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          <div className="space-y-2">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Problem</h3>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
              Winning bids become financial outcomes. Incorrect settlements cannot be tolerated.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Decision</h3>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
              Store authoritative settlement records in Aurora DSQL.
            </p>
            <div className="space-y-1.5 pt-2 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase border-t border-gray-100 dark:border-gray-800">
              <div>✓ Serializable transactions</div>
              <div>✓ Strong consistency</div>
              <div>✓ Financial auditability</div>
              <div>✓ Multi-region durability</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 📊 DECISION 03: SEPARATING TRAFFIC FROM TRUTH                        */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
        <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black tracking-wider text-purple-600 dark:text-purple-400 uppercase px-3 py-2.5 shadow-inner text-left flex justify-between items-center">
          <span>Decision 03 // Separation of Concerns</span>
          <span className="font-mono bg-purple-100 dark:bg-purple-900/40 text-purple-600 px-2 py-0.5 rounded text-[9px]">Isolation Core</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight px-1">
          Why Separate Traffic From Truth?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          <div className="space-y-2">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Problem</h3>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
              Treating every event as a transaction creates unnecessary coordination overhead.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Decision</h3>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
              Traffic and business truth are stored in specialized systems.
            </p>
            <div className="space-y-1.5 pt-2 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase border-t border-gray-100 dark:border-gray-800">
              <div>✓ Reduced contention</div>
              <div>✓ Better performance</div>
              <div>✓ Clear ownership</div>
              <div>✓ Lower consistency cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 📊 DECISION 04: OCC + FULL JITTER                                    */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
        <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black tracking-wider text-rose-600 dark:text-rose-400 uppercase px-3 py-2.5 shadow-inner text-left flex justify-between items-center">
          <span>Decision 04 // Lock-Free Conflict Backoff Pipeline</span>
          <span className="font-mono bg-rose-100 dark:bg-rose-900/40 text-rose-600 px-2 py-0.5 rounded text-[9px]">OCC Jitter</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight px-1">
          Why OCC + Full Jitter?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
          <div className="space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Conflict Scenario</h3>
            <div className="rounded-xl border p-4 bg-gray-900 border-gray-800 shadow-inner space-y-1 font-mono text-xs text-blue-400">
              <div className="flex justify-between text-gray-400"><span>Worker A</span> <span>settle(slot_123)</span></div>
              <div className="flex justify-between text-gray-400"><span>Worker B</span> <span>settle(slot_123)</span></div>
              <div className="text-center text-gray-600 py-1 select-none">↓</div>
              <div className="text-rose-500 font-bold text-center uppercase tracking-wider text-[10px]">Serialization Conflict</div>
              <div className="text-center text-gray-600 py-1 select-none">↓</div>
              <div className="flex justify-between text-gray-500 text-[11px]"><span>Attempt #1: ✕</span> <span>Attempt #2: ✕</span> <span className="text-emerald-500 font-bold">Commit: ✓</span></div>
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Decision</h3>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-relaxed">
                Use Optimistic Concurrency Control with randomized exponential backoff to recover safely from write conflicts.
              </p>
            </div>
            <div className="space-y-1.5 pt-2 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase border-t border-gray-100 dark:border-gray-800">
              <div>✓ Conflict recovery</div>
              <div>✓ Fair retry distribution</div>
              <div>✓ Reduced retry storms</div>
              <div>✓ Stable throughput</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 📊 DECISION 05: WHY NOT USE ONE DATABASE                             */}
      {/* ==================================================================== */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
        <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-[10px] font-black tracking-wider text-orange-600 dark:text-orange-400 uppercase px-3 py-2.5 shadow-inner text-left flex justify-between items-center">
          <span>Decision 05 // Strategic Workload Comparison</span>
          <span className="font-mono bg-orange-100 dark:bg-orange-900/40 text-orange-600 px-2 py-0.5 rounded text-[9px]">Topology Proof</span>
        </div>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight px-1">
          Why Not Use One Database?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
          {/* Monolith Failure Box */}
          <div className="bg-gray-50/40 dark:bg-gray-900/20 border border-gray-100 dark:border-gray-800 rounded-xl p-4 space-y-2 shadow-inner">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Single Database</h3>
            <div className="space-y-1.5 text-[11px] font-bold text-rose-500 uppercase tracking-wide">
              <div>✕ Transaction contention</div>
              <div>✕ Higher coordination cost</div>
              <div>✕ Expensive scaling</div>
              <div>✕ Mixed workload patterns</div>
            </div>
          </div>

          {/* Specialized Storage Box */}
          <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border-2 border-emerald-400/30 rounded-xl p-4 space-y-2 shadow-sm">
            <h3 className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Specialized Storage</h3>
            <div className="space-y-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
              <div>✓ Traffic optimized</div>
              <div>✓ Truth optimized</div>
              <div>✓ Independent scaling</div>
              <div>✓ Better cost profile</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 🏁 FINAL CARD: THE INSIGHT CHAMPION KEYNOTE                          */}
      {/* ==================================================================== */}
      <section className="w-full bg-black rounded-3xl p-8 md:p-14 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle Decorative Gradient Blurs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="uppercase tracking-[0.25em] text-[10px] font-mono font-bold text-gray-500">
          Key Architectural Insight
        </div>

        <h2 className="text-3xl md:text-4xl font-black tracking-tight max-w-3xl mx-auto leading-tight text-white uppercase">
          Not every event deserves global consistency.
        </h2>

        <p className="max-w-2xl mx-auto text-xs md:text-sm font-semibold text-gray-400 leading-relaxed uppercase tracking-wider">
          Auction traffic is abundant. Financial truth is scarce. Treat them differently.
        </p>

        <div className="max-w-sm mx-auto bg-gray-900 border border-gray-800 rounded-xl p-3 text-[10px] font-mono text-gray-300 space-y-1 shadow-inner text-left sm:text-center">
          <div className="flex justify-between"><span>Traffic Events Log</span> <span className="text-blue-400 font-bold">──► Amazon DynamoDB</span></div>
          <div className="flex justify-between"><span>Financial Consensus Truth</span> <span className="text-emerald-400 font-bold">──► Amazon Aurora DSQL</span></div>
        </div>

        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pt-2 max-w-xl mx-auto leading-relaxed">
          The cost of coordination should match the value of the data.
        </p>

        <div className="pt-4">
          <Link
            href="/architecture"
            className="inline-block bg-white hover:bg-gray-100 text-black text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md"
          >
            View System Architecture
          </Link>
        </div>
      </section>

    </div>
  );
}