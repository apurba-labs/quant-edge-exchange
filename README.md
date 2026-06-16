# Quant Edge Exchange

## Real-Time Global Ad Auction & Settlement Platform

Quant Edge Exchange is a distributed auction and settlement simulation platform that demonstrates how high-frequency event ingestion and globally consistent financial settlement can coexist using Amazon DynamoDB and Aurora DSQL.

The platform models a real-world advertising exchange where regional edge nodes generate bids, DynamoDB absorbs ingestion traffic at high velocity, and Aurora DSQL finalizes settlements through a conflict-aware transactional ledger.

---

## Live Demo

https://quant-edge-exchange.vercel.app/

## Repository

https://github.com/apurba-labs/quant-edge-exchange

---

## Core Design Principle

> The cost of coordination should match the value of the data.

Transient bid traffic

→ DynamoDB

Authoritative financial truth

→ Aurora DSQL

Settlement contention

→ OCC + Full Jitter Backoff

Observability

→ Analytics & Telemetry

---

## Architecture Overview

```text
Transient Bid Traffic
        ↓
     DynamoDB
        ↓
 Bid Evaluation
        ↓
 Authoritative Outcome
        ↓
   Aurora DSQL
        ↓
 OCC + Full Jitter Backoff
        ↓
 Financial Truth
        ↓
 Observability Layer
```

### Detailed Data Flow

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
│    SK: REGION#<Region>#BID  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ 2. Bid Evaluation Engine    │
│    - Ranking                │
│    - Quality Scoring        │
│    - Winner Selection       │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ 3. Aurora DSQL Settlement   │
│    - Financial Ledger       │
│    - OCC Retry Engine       │
│    - Conflict Tracking      │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ 4. Observability Layer      │
│    - Ingestion Analytics    │
│    - Conflict Telemetry     │
│    - Settlement Monitoring  │
└─────────────────────────────┘
```

---

## Key Features

### DynamoDB Ingestion Layer

* Single-table design
* High-throughput bid ingestion
* Regional traffic aggregation
* Event lifecycle management using TTL

Schema:

```text
PK = SLOT#<slotId>
SK = REGION#<region>#BID#<bidId>
```

### Aurora DSQL Settlement Layer

* Bid persistence
* Winner selection
* Financial settlement
* Conflict tracking
* Ledger management

### OCC Conflict Resolution

* Optimistic Concurrency Control
* Exponential Backoff
* Full Jitter Retry Strategy
* Settlement conflict telemetry

### Observability

* Exchange Simulator
* Ingestion Analytics
* Conflict Dashboard
* Settlement Monitoring
* Simulation History

---

## Technology Stack

### Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* Vercel

### Backend

* Amazon DynamoDB
* Aurora DSQL
* PostgreSQL
* AWS SDK v3

### Infrastructure

* Docker
* Docker Compose
* Turborepo
* AWS IAM
* Vercel OIDC Integration

---

## Prerequisites

* Node.js 22+
* npm 11+
* Docker
* Docker Compose
* PostgreSQL 16+

---

## Installation

### Clone Repository

```bash
git clone https://github.com/apurba-labs/quant-edge-exchange.git

cd quant-edge-exchange
```

### Install Dependencies

```bash
npm install
```

### Start Local Infrastructure

```bash
docker compose \
-f infrastructure/docker/docker-compose.yml \
up -d
```

---

## Environment Variables

Create:

```text
apps/web/.env.local
```

Example:

```env
AWS_REGION=us-east-1

DYNAMODB_ENDPOINT=http://localhost:8000

DYNAMODB_BID_TABLE=bid_events

PGHOST=localhost
PGPORT=5433
PGDATABASE=quant_edge_ledger
PGUSER=platform_builder
PGPASSWORD=local_secret_password
```

---

## Database Setup

Initialize the local database:

```bash
npm run db:setup
```

The setup process:

* Verifies database connectivity
* Creates required schema
* Loads sample seed data
* Validates repository dependencies

---

## Run Development Server

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```

---

## Project Structure

```text
apps/
└── web/

docs/
├── architecture/
├── devlogs/
└── submission/

infrastructure/
├── docker/
└── sql/

packages/
└── simulations/
```

---

## Lessons Learned

The most important lesson from this project was:

> Traffic and truth are different data products.

Not every event deserves global consistency.

By separating transient ingestion traffic from authoritative financial settlement, the system becomes easier to scale, observe, and reason about.

---

## Future Enhancements

* DynamoDB Global Tables
* Aurora DSQL Change Streams
* EventBridge Integration
* WebSocket Live Streaming
* Multi-Region Settlement Orchestration
* Chaos Engineering Simulations
* Advanced Auction Ranking Algorithms

---

## Project Status

✅ DynamoDB ingestion layer

✅ Aurora DSQL settlement layer

✅ OCC conflict resolution engine

✅ Conflict telemetry dashboard

✅ Ingestion analytics dashboard

✅ AWS infrastructure integration

✅ Vercel deployment

🚀 Hackathon submission and demo preparation in progress
