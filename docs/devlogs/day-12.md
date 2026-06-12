# Day 12

Date: 2026-06-12

## Objective

Introduce Amazon DynamoDB as the platform ingestion layer and begin implementing the hybrid storage architecture.

---

## Completed

### DynamoDB Local Integration

Configured and validated local DynamoDB execution through Docker.

Services:

* DynamoDB Local
* Aurora/PostgreSQL Local
* Redis Local

Verified SDK connectivity from the Next.js application layer.

---

### DynamoDB Client

Implemented reusable DynamoDB Document Client.

Features:

* Local development endpoint support
* Production-ready AWS credential chain support
* Environment-driven configuration
* Shared singleton client lifecycle

---

### Bid Events Table

Created:

bid_events

Primary Key Design:

Partition Key:

PK = SLOT#<slotId>

Sort Key:

SK = REGION#<region>#BID#<bidId>

Example:

PK = SLOT#05192f6b
SK = REGION#us-east-1#BID#7580dfbc

This design enables efficient access patterns while aligning with DynamoDB single-table design principles.

---

### Event Retention Strategy

Added Time-To-Live (TTL) support.

Bid events are treated as temporary ingestion records and are configured to expire automatically after 24 hours.

This keeps operational storage costs predictable while preserving permanent financial records in Aurora DSQL.

---

### Repository Layer

Implemented:

saveBidEvent()

Responsibilities:

* Persist raw bid events
* Generate DynamoDB item structure
* Store regional metadata
* Store expiration metadata

---

## Verification

Successfully validated:

* DynamoDB Local connectivity
* Table creation
* SDK communication
* Event persistence workflow

---

## Architecture Evolution

Previous:

Simulator
↓
Aurora DSQL

Current:

Simulator
↓
DynamoDB (Ingress Layer)
↓
Aurora DSQL (Settlement Layer)

The platform now follows a dual-engine architecture separating ingestion workloads from transactional settlement workloads.

---

## Next Steps

* Integrate saveBidEvent() into simulator execution flow
* Create hybrid storage ADR
* Build Aurora DSQL OCC retry engine
* Add real-time dashboard streaming
* Deploy to AWS and Vercel
