# ADR-0002

## Title

Use DynamoDB as the bid ingestion layer.

## Status

Accepted

## Context

The platform must ingest high-volume bid traffic with low latency and horizontal scalability.

## Decision

DynamoDB will serve as the primary ingestion datastore for incoming bid events.

## Consequences

### Benefits

- Horizontal scalability
- Low latency writes
- Managed infrastructure

### Tradeoffs

- Eventual consistency considerations
- Additional synchronization required with settlement systems