# Quant Edge Exchange - Judge Notes

Key Technologies

* Amazon DynamoDB
* Aurora DSQL (local simulation)
* Next.js 16
* Turbo Monorepo
* TypeScript

What to Look For

1. High-velocity bid ingestion into DynamoDB
2. Single-table partition strategy
3. Aurora DSQL settlement workflow
4. OCC conflict detection and retry handling
5. Real-time operational dashboards
6. Conflict storm simulation results

Core Metrics

* Conflict Resolution Rate
* Average Retry Depth
* Ingestion Events
* Regional Distribution
* Settlement Success Rate

Architecture Goal

Separate high-frequency ingestion from strongly consistent settlement processing while preserving operational visibility and auditability.
