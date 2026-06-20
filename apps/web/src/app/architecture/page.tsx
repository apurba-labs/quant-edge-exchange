"use client";
import React from "react";
import Link from "next/link";

export default function ArchitecturePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

      {/* ==================================================================== */}
      {/* 🏛️ HERO SELECTION                                                   */}
      {/* ==================================================================== */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500 shadow-sm">
          Architecture Overview
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white uppercase max-w-3xl mx-auto leading-tight">
          Traffic and Truth are Different Data Products
        </h1>

        <p className="max-w-2xl mx-auto text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
          Quant Edge Exchange demonstrates how high-volume event traffic and financial truth can be modeled using purpose-built data stores.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/simulator"
            className="px-6 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-sm"
          >
            Launch Simulator
          </Link>
          <Link
            href="/simulator"
            className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
          >
            View Analytics
          </Link>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 📊 WHY TWO DATABASES                                                */}
      {/* ==================================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase text-center">
          Why Two Databases?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Traditional Architecture</h3>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                Every event enters the same database regardless of whether it is temporary traffic or financial truth.
              </p>
            </div>
            <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
              <div className="text-xs font-bold text-rose-500 uppercase flex items-center gap-2"><span>❌</span> High coordination cost</div>
              <div className="text-xs font-bold text-rose-500 uppercase flex items-center gap-2"><span>❌</span> Transaction contention</div>
              <div className="text-xs font-bold text-rose-500 uppercase flex items-center gap-2"><span>❌</span> Serialization pressure</div>
            </div>
          </div>

          {/* Quant Edge Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-black text-blue-500 uppercase tracking-wider">Quant Edge Exchange</h3>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                Traffic and truth are separated into specialized storage layers.
              </p>
            </div>
            <div className="space-y-2 border-t border-gray-100 dark:border-gray-700 pt-4 mt-4">
              <div className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-2"><span>✅</span> High-throughput ingestion</div>
              <div className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-2"><span>✅</span> Strong settlement consistency</div>
              <div className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-2"><span>✅</span> Clear separation of concerns</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 🚀 SYSTEM ARCHITECTURE VERTICAL FLOW                                 */}
      {/* ==================================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase text-center">
          System Architecture
        </h2>

        <div className="flex flex-col items-center w-full max-w-xl mx-auto">
          
          {/* STAGE 1 */}
          <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-gray-400 w-1.5 h-full"></div>
            <span className="text-[9px] font-mono font-black bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Stage 01 • Traffic
            </span>
            <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mt-2">
              Global Bid Traffic
            </h4>
            <div className="inline-flex items-center gap-1 mt-2 font-mono text-[10px] text-gray-400">
              <span className="font-bold">Regions:</span> us-east-1 • eu-west-1 • ap-southeast-1 • sa-east-1
            </div>
            <p className="text-xs text-gray-500 mt-2 font-medium">Purpose: Generate high-volume auction traffic.</p>
          </div>

          <div className="flex justify-center items-center my-3 select-none">
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-7 h-7 rounded-full shadow-inner">
                <svg className="w-3.5 h-3.5 text-gray-900 dark:text-white stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
          </div>
          {/* STAGE 2 */}
          <div className="w-full bg-white dark:bg-gray-800 border-2 border-blue-500/80 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-blue-500 w-1.5 h-full"></div>
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono font-black bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Stage 02 • DynamoDB
                </span>
                <h4 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight pt-1">
                  Transient Traffic Layer
                </h4>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wide">
                Stores short-lived bid events
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-100 dark:border-gray-800 font-mono text-[11px] text-gray-600 dark:text-gray-400 shadow-inner">
                <span className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Single Table Design</span>
                <div>PK = SLOT#{"{slotId}"}</div>
                <div>SK = REGION#{"{region}"}#BID#{"{bidId}"}</div>
              </div>
              <div className="flex flex-col justify-center space-y-1 text-emerald-500 font-bold uppercase text-[10px] px-1">
                <div>✓ Fast writes</div>
                <div>✓ Regional aggregation</div>
                <div>✓ TTL lifecycle management</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center my-3 select-none">
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-7 h-7 rounded-full shadow-inner">
                <svg className="w-3.5 h-3.5 text-gray-900 dark:text-white stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
          </div>
          {/* STAGE 3 */}
          <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-purple-500 w-1.5 h-full"></div>
            <span className="text-[9px] font-mono font-black bg-purple-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              Stage 03 • Evaluation
            </span>
            <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mt-2">
              Auction Decision Engine
            </h4>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Ranks bids and selects the winning settlement candidate.
            </p>
          </div>

          <div className="flex justify-center items-center my-3 select-none">
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-7 h-7 rounded-full shadow-inner">
                <svg className="w-3.5 h-3.5 text-gray-900 dark:text-white stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
          </div>

          {/* STAGE 4 */}
          <div className="w-full bg-white dark:bg-gray-800 border-2 border-emerald-500/80 rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-emerald-500 w-1.5 h-full"></div>
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Stage 04 • Aurora DSQL
                </span>
                <h4 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight pt-1">
                  Authoritative Business Truth
                </h4>
              </div>
              <span className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-wide">
                Stores authoritative business outcomes
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] font-mono font-bold text-gray-600 dark:text-gray-400">
              <span className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2 py-1 rounded-lg">✓ Winning bids</span>
              <span className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2 py-1 rounded-lg">✓ Settlement records</span>
              <span className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2 py-1 rounded-lg">✓ Financial ledger</span>
              <span className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-2 py-1 rounded-lg">✓ Conflict telemetry</span>
            </div>
          </div>

          <div className="flex justify-center items-center my-3 select-none">
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 w-7 h-7 rounded-full shadow-inner">
                <svg className="w-3.5 h-3.5 text-gray-900 dark:text-white stroke-[3.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
          </div>

          {/* STAGE 5 */}
          <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-indigo-500 w-1.5 h-full"></div>
            <span className="text-[9px] font-mono font-black bg-indigo-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              Stage 05 • Analytics
            </span>
            <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mt-2">
              Observability & Audit Layer
            </h4>
            <p className="text-xs text-gray-500 mt-2 font-medium">
              Tracks settlement activity, conflict metrics, and operational telemetry.
            </p>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 📊 DATABASE RESPONSIBILITIES                                         */}
      {/* ==================================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase text-center">
          Database Responsibilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DynamoDB */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-base font-black text-gray-900 dark:text-white uppercase font-mono">Amazon DynamoDB</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Optimized For: High-Throughput Event Ingestion.</p>
            </div>
            <div className="space-y-2 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              <div>✓ Bid ingestion</div>
              <div>✓ Regional traffic aggregation</div>
              <div>✓ Telemetry collection</div>
              <div>✓ Event lifecycle management</div>
            </div>
          </div>

          {/* Aurora DSQL */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-base font-black text-gray-900 dark:text-white uppercase font-mono">Amazon Aurora DSQL</h3>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Purpose: Authoritative financial settlement.</p>
            </div>
            <div className="space-y-2 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              <div>✓ Winning bids</div>
              <div>✓ Settlements</div>
              <div>✓ Financial ledger</div>
              <div>✓ Conflict telemetry</div>
              <div>✓ Serializable transactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* ⚡ CONFLICT RESOLUTION WITH OCC                                     */}
      {/* ==================================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase text-center">
          Conflict Resolution with OCC + Full Jitter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 space-y-3 shadow-sm flex flex-col justify-between">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block">01 // Concurrency Collision</span>
            <div className="space-y-1.5 font-mono text-[11px] text-gray-600 dark:text-gray-400">
              <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border flex justify-between"><span>Worker A</span> <span className="text-blue-500 font-bold">settle(slot_123)</span></div>
              <div className="bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border flex justify-between"><span>Worker B</span> <span className="text-blue-500 font-bold">settle(slot_123)</span></div>
            </div>
            <div className="text-center font-bold text-gray-300">↓</div>
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 py-1.5 rounded-xl text-center font-mono text-[10px] font-black text-rose-500 uppercase">
              Serialization Conflict
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-2">02 // Retry Engine Protocol</span>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide leading-relaxed">
                Optimistic Concurrency Control handles cross-node clashes gracefully using an exponential backoff formula mixed with full randomized jitter:
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 border border-gray-800 text-center font-mono text-[10px] text-blue-400 font-bold shadow-inner mt-4">
              retryDelay = random(0, base &times; 2<sup>attempt</sup>)
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-wider block mb-2">03 // Execution History Logs</span>
              <div className="space-y-1 font-mono text-xs">
                <div className="bg-gray-50 dark:bg-gray-900 border px-2.5 py-1.5 rounded-xl flex justify-between items-center"><span className="text-gray-400">Attempt #1</span> <span className="font-black text-rose-500 uppercase text-[9px]">❌ Aborted</span></div>
                <div className="bg-gray-50 dark:bg-gray-900 border px-2.5 py-1.5 rounded-xl flex justify-between items-center"><span className="text-gray-400">Attempt #2</span> <span className="font-black text-rose-500 uppercase text-[9px]">❌ Aborted</span></div>
                <div className="bg-gray-50 dark:bg-gray-900 border px-2.5 py-1.5 rounded-xl flex justify-between items-center"><span className="text-gray-700 dark:text-gray-300 font-bold">Attempt #3</span> <span className="font-black text-emerald-500 uppercase text-[9px] animate-pulse">✅ Committed</span></div>
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 py-1.5 rounded-xl text-center text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase mt-2">
              Successful Settlement
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 📊 SECTION 5: TECHNOLOGY STACK                                      */}
      {/* ==================================================================== */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase text-center">
          PLATFORM COMPONENTS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm text-left">
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Frontend Layer</span>
            <span className="font-mono text-xs font-black text-gray-900 dark:text-white block">Next.js 16</span>
            <span className="text-[10px] text-gray-400 font-medium block">TypeScript / Tailwind</span>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm text-left">
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Runtime Core</span>
            <span className="font-mono text-xs font-black text-gray-900 dark:text-white block">Vercel Edge</span>
            <span className="text-[10px] text-gray-400 font-medium block">Global Serverless Nodes</span>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm text-left border-l-2 border-l-blue-400">
            <span className="text-[9px] font-bold text-blue-500 uppercase block mb-1">Traffic Layer</span>
            <span className="font-mono text-xs font-black text-gray-900 dark:text-white block">Amazon DynamoDB</span>
            <span className="text-[10px] text-gray-400 font-medium block">Single-Table Key Partition</span>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm text-left border-l-2 border-l-emerald-400">
            <span className="text-[9px] font-bold text-emerald-500 uppercase block mb-1">Truth Layer</span>
            <span className="font-mono text-xs font-black text-gray-900 dark:text-white block">Amazon Aurora DSQL</span>
            <span className="text-[10px] text-gray-400 font-medium block">Active-Active Serializable ACID</span>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm text-left">
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Security Authentication</span>
            <span className="font-mono text-xs font-black text-gray-900 dark:text-white block">AWS SigV4</span>
            <span className="text-[10px] text-gray-400 font-medium block">Cryptographic Request Signing</span>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm text-left">
            <span className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Observability</span>
            <span className="font-mono text-xs font-black text-gray-900 dark:text-white block">Telemetry Dashboard</span>
            <span className="text-[10px] text-gray-400 font-medium block">Custom Live Metrics UI</span>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 🏁 FINAL CARD: THE INSIGHT CHAMPION KEYNOTE                          */}
      {/* ==================================================================== */}
      <section className="w-full bg-gray-900 dark:bg-black rounded-3xl p-8 md:p-14 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
        
        {/* Subtle Decorative Gradient Blurs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <h2 className="text-xs font-black uppercase tracking-widest text-gray-500 font-mono">
          Key Architectural Insight
        </h2>

        <p className="text-2xl md:text-4xl font-black uppercase tracking-tight max-w-3xl mx-auto leading-tight text-white">
          "Not every event deserves global consistency."
        </p>

        <div className="max-w-md mx-auto bg-gray-800/40 border border-gray-700/50 rounded-2xl p-4 text-xs font-mono text-gray-300 space-y-2 shadow-inner text-left sm:text-center">
          <div className="flex justify-between"><span>Traffic Events</span> <span className="text-blue-400 font-black">──► Amazon DynamoDB</span></div>
          <div className="flex justify-between"><span>Financial Truth</span> <span className="text-emerald-400 font-black">──► Amazon Aurora DSQL</span></div>
        </div>

        <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest pt-2 max-w-xl mx-auto leading-relaxed">
          The cost of coordination should match the value of the data.
        </p>
      </section>

    </div>
  );
}