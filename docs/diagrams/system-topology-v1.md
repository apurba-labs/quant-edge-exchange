# Quant Edge Exchange - System Topology v1

```text
                         Global Advertisers
                                  │
                                  ▼
                     Next.js 16 + Vercel Frontend
                                  │
                                  ▼
                       API Routes / Server Actions
                                  │
             ┌────────────────────┴────────────────────┐
             │                                         │
             ▼                                         ▼

      DynamoDB Ingestion                    Aurora DSQL Settlement
      (High Volume Bids)                    (Strong Consistency)

             │                                         ▲
             │                                         │
             ▼                                         │

       Conflict Detector ───── Retry Engine ───────────┘

             │
             ▼

       Financial Ledger

             │
             ▼

     Telemetry & Observability

             │
             ▼

       Real-Time Dashboard
```

## Purpose

Separate high-volume bid ingestion from settlement operations.

## Design Goals

* Horizontal scalability
* Distributed settlement
* Conflict visibility
* Real-time telemetry
* Active-active architecture
