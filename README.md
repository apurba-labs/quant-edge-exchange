# Quant Edge Exchange

## Real-time Global Ad Auction & Settlement Platform

Quant Edge Exchange is a million-scale advertising marketplace simulator that demonstrates real-time bid ingestion, distributed settlement, and conflict resolution using DynamoDB, Aurora DSQL, and Vercel.

## Goals

- Simulate high-volume global ad auctions
- Demonstrate distributed settlement workflows
- Showcase DynamoDB ingestion at scale
- Showcase Aurora DSQL active-active transactions
- Visualize conflict detection and retry mechanisms

## 3. System Architecture

The platform leverages a globally distributed, event-driven, active-active architecture designed for sub-second ingestion, low-latency evaluation, and globally coordinated transactional settlement.

### High-Level Data Flow

```text
Global Edges / Regions
───────────────────────────────
  us-east-1    │    eu-west-1
  sa-east-1    │    ap-southeast-1
───────────────────────────────
               │
               ▼
┌─────────────────────────────┐
│ 1. DynamoDB Global Ingest   │
│    PK: SLOT#<SlotID>        │
│    SK: REGION#<BidID>       │
└──────────────┬──────────────┘
               │ (Low-Latency Stream / Event)
               ▼
┌─────────────────────────────┐
│ 2. Bid Evaluation Engine    │
│    - Business Rule Filter   │
│    - Top-Bid Selection      │
└──────────────┬──────────────┘
               │ (Deterministic Payload)
               ▼
┌─────────────────────────────┐
│ 3. Aurora DSQL Engine       │
│    - Global Ledger Write    │
│    - OCC Retry Manager      │
└──────────────┬──────────────┘
               │ (CDC Stream / Replica)
               ▼
┌─────────────────────────────┐
│ 4. Dashboard Analytics      │
│    - Real-Time Views        │
└─────────────────────────────┘
```

### Architectural Component Breakdown

#### 1. Global Edge Ingestion
* **Technology:** Amazon DynamoDB (Global Tables).
* **Pattern:** Active-Active multi-region writes with single-digit millisecond localized access.
* **Schema Design:**
  * **Partition Key (`PK`):** `SLOT#<SlotID>` – Isolates ingestion traffic by target transaction or time block to allow high horizontal concurrency.
  * **Sort Key (`SK`):** `REGION#<BidID>` – Pairs the originating ingestion edge region with the unique transaction identifier to avoid regional write collision patterns.

#### 2. Bid Evaluation & Winner Selection
* **Processing:** Computes deterministic execution logic immediately post-ingestion.
* **Characteristics:** State-free, high-throughput workers filtering out-of-bounds metrics, calculating rank optimization, and identifying the winning bid payload within dedicated execution slices.

#### 3. Aurora DSQL Settlement Ledger
* **Technology:** Amazon Aurora DSQL (Distributed SQL).
* **Pattern:** Multi-region, globally distributed relational clustering providing strict serializability.
* **Concurrency Engine:** Built-in **Optimistic Concurrency Control (OCC) Retry Engine**. If two global workers conflict on final ledger placement, the OCC state-machine automatically retries the operation deterministically to guarantee global data consistency without database deadlocks.

#### 4. Dashboard Analytics
* **Technology:** Read-Replicas / Change Data Capture (CDC) Event Viewers.
* **Pattern:** Decoupled reporting layer. Eliminates transactional noise from the critical path, serving fast analytics, audit history, and real-time visualization streams directly to the end-user.


## Tech Stack

### Frontend
- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Vercel

### Backend
- Next.js Server Actions
- DynamoDB
- Aurora DSQL

## Status

🚧 Under active development for the H0 Hackathon.