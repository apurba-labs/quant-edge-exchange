# ADR-0001

## Title

Use Aurora DSQL as the settlement database.

## Status

Accepted

## Context

Quant Edge Exchange requires globally consistent transaction settlement across multiple regions while handling concurrent bid updates.

## Decision

Aurora DSQL will be used as the authoritative settlement and ledger datastore.

## Consequences

### Benefits

- Active-active architecture
- Strong consistency
- Distributed SQL semantics

### Tradeoffs

- Additional complexity compared to a single-region database
- Transaction conflict handling required