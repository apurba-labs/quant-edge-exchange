# Quant Edge Exchange Architecture

Quant Edge Exchange separates high-frequency event ingestion from strongly consistent financial settlement.

## Ingestion Layer

Amazon DynamoDB receives incoming bid events from multiple simulated regions.

Partition Strategy:

PK = SLOT#<slot_id>

SK = REGION#<region>#BID#<bid_id>

Benefits:

* High write throughput
* Low latency ingestion
* Region-aware event tracking
* Automatic cleanup using TTL

## Settlement Layer

Aurora DSQL stores transactional state:

* Accounts
* Ad Slots
* Bids
* Settlements
* Financial Ledger
* Conflict Events

Aurora DSQL guarantees transactional correctness using SERIALIZABLE isolation.

## OCC Conflict Resolution

When multiple regions attempt to settle the same slot simultaneously:

1. Transaction begins
2. Conflict detected
3. SQLSTATE 40001 returned
4. Full Jitter Backoff applied
5. Transaction retried
6. Settlement finalized

Conflict telemetry is recorded and displayed through the OCC dashboard.

## Analytics Layer

The platform exposes two operational views:

1. Aurora DSQL Operations Dashboard
2. DynamoDB Ingestion Analytics Dashboard

Together they visualize the complete lifecycle of a bid from ingestion to settlement.
