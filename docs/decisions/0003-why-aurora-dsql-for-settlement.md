# ADR-0003: Why Aurora DSQL Handles Settlement

## Context

Real-time bidding generates large volumes of short-lived traffic.

Not every bid should be written directly into a globally consistent ledger.

## Decision

Use DynamoDB as the ingestion buffer.

Use Aurora DSQL as the final settlement and accounting system.

## Consequences

Advantages:

* Faster ingestion
* Lower contention
* Reduced transaction conflicts
* Strong financial consistency

Tradeoffs:

* Additional synchronization layer
* More operational complexity

This tradeoff was accepted because financial correctness is more important than implementation simplicity.
