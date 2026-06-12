# Day 13

## Objective

Complete the integration of Amazon DynamoDB into the simulation workflow and establish the ingestion layer of the platform's hybrid storage architecture.

---

## Completed

### DynamoDB Event Ingestion

Integrated DynamoDB persistence directly into the simulation execution flow.

Each generated bid event is now written to DynamoDB before settlement processing occurs.

Current Flow:

Traffic Simulator
↓
DynamoDB Bid Event Storage
↓
Settlement Engine
↓
Aurora DSQL
↓
Analytics Persistence

---

### Bid Event Repository

Implemented:

* saveBidEvent()

Responsibilities:

* Persist raw bid events
* Store regional metadata
* Store bid amounts
* Store ingestion timestamps
* Apply automatic expiration metadata

---

### DynamoDB Data Model

Table:

bid_events

Partition Key:

PK = SLOT#<slotId>

Sort Key:

SK = REGION#<region>#BID#<bidId>

Example:

PK = SLOT#SLOT-82

SK = REGION#eu-west-1#BID#41057126-faee-43ca-9879-4f651d1e77cc

This structure enables efficient partitioning of bid traffic while supporting region-specific access patterns.

---

### Time-To-Live (TTL)

Added automatic expiration support for transient bid traffic.

Raw bid events are configured to expire after 24 hours, allowing DynamoDB to function as a temporary ingestion buffer while preserving permanent settlement records within Aurora DSQL.

---

### Validation

Successfully verified:

* DynamoDB Local connectivity
* Bid event persistence
* Simulator integration
* Multi-region bid ingestion
* TTL metadata generation

Sample regions observed:

* us-east-1
* eu-west-1
* ap-southeast-1
* sa-east-1

---

## Architecture Evolution

Previous:

Simulator
↓
Aurora DSQL

Current:

Simulator
↓
DynamoDB
(Bid Event Ingestion)
↓
Settlement Engine
↓
Aurora DSQL
(Financial Settlement & Analytics)

The platform now utilizes a hybrid storage model where DynamoDB absorbs high-velocity event ingestion while Aurora DSQL remains responsible for transactional consistency and financial persistence.

---

## Next Steps

* Implement Aurora DSQL OCC Retry Engine
* Add Architecture Decision Records (ADR)
* Create system architecture documentation
* Implement real-time dashboard streaming
* Deploy to AWS and Vercel
