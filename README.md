# Quant Edge Exchange

## Inspiration

Modern digital advertising exchanges process millions of bidding events across geographically distributed regions every day. These systems face a difficult challenge: they must ingest massive volumes of events with minimal latency while simultaneously maintaining strong consistency for financial settlement.

Quant Edge Exchange was built to explore how a hybrid architecture can separate high-velocity ingestion from globally coordinated settlement without sacrificing observability, consistency, or operational transparency.

## The Problem

A globally distributed auction platform must satisfy two competing requirements:

* Accept high-frequency bid traffic from multiple regions with minimal latency.
* Guarantee accurate financial settlement without duplicate winners, race conditions, or conflicting ledger entries.

Sending all traffic directly to a globally consistent relational database can introduce transaction contention and serialization conflicts under heavy load.

Quant Edge Exchange demonstrates an architecture that decouples these responsibilities by combining DynamoDB for ingestion and Aurora DSQL for settlement.

## Key Architectural Decisions

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

### DynamoDB for Event Ingestion

Incoming bids are written into a DynamoDB single-table design using:

```text
PK = SLOT#<SlotID>
SK = REGION#<Region>#BID#<BidID>
```

This allows:

* High write throughput
* Regional traffic isolation
* Efficient aggregation
* Automatic lifecycle management through TTL

### Aurora DSQL for Settlement

Aurora DSQL serves as the transactional settlement engine.

Responsibilities include:

* Bid persistence
* Winner determination
* Settlement tracking
* Financial ledger management
* Conflict resolution telemetry

### Optimistic Concurrency Control (OCC)

Distributed systems naturally encounter transaction contention when multiple workers attempt to settle the same auction.

To address this, Quant Edge Exchange implements an application-level OCC retry engine that:

* Detects settlement conflicts
* Tracks retry attempts
* Records conflict telemetry
* Ensures eventual successful settlement

## Observability & Analytics

The platform exposes operational visibility through multiple dashboards:

### Exchange Simulator

Displays:

* Real-time bid activity
* Settlement history
* Financial ledger events
* Regional winner distribution

### Conflict Monitoring

Tracks:

* Total conflicts
* Retry counts
* Resolution rates
* Conflict storm simulations

### Ingestion Analytics

Provides visibility into:

* Regional traffic distribution
* Hot auction slots
* Total ingestion events
* Recent event activity

## Lessons Learned

Building distributed systems requires balancing throughput, consistency, and observability.

This project provided hands-on experience with:

* Single-table DynamoDB design
* Optimistic concurrency control
* Distributed transaction modeling
* Event-driven architecture
* Real-time operational monitoring

## Future Enhancements

* DynamoDB Global Tables
* Real Aurora DSQL deployment
* EventBridge integration
* WebSocket-based live streaming
* Multi-region settlement orchestration
* Advanced auction ranking algorithms

## Status

🚧 Under active development for the H0 Hackathon.

## Project Status

✅ Core platform complete

✅ DynamoDB ingestion layer

✅ Aurora DSQL settlement layer

✅ OCC conflict resolution engine

✅ Real-time monitoring dashboard

✅ Ingestion analytics dashboard

✅ Production build verification

🚀 Final deployment and submission preparation in progress