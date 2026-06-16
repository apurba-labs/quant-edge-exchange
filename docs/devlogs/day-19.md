# Day 19 – AWS Infrastructure Provisioning & Database Architecture

## Summary

Today focused on preparing the cloud infrastructure required for the final hackathon deployment. The goal was to move beyond local-only development and establish production-ready AWS resources that align with the project's distributed systems architecture.

## Completed Work

### Aurora DSQL Cluster Provisioning

Created and activated the production Aurora DSQL cluster:

* Cluster Name: `quant-edge-ledger-cluster`
* Region: `us-east-1`
* Multi-region capable architecture
* Public endpoint enabled for development and validation

This cluster represents the authoritative settlement ledger for the platform.

### DynamoDB Ingestion Architecture Validation

Reviewed and validated the DynamoDB single-table design used by the ingestion layer:

Partition Key:

```text
PK = SLOT#<SlotID>
```

Sort Key:

```text
SK = REGION#<Region>#BID#<BidID>
```

The design allows high-concurrency writes while maintaining efficient aggregation patterns for analytics dashboards.

### IAM Security Design

Created the dedicated deployment role:

```text
QuantEdge_Vercel_OIDC_Role
```

Attached:

```text
QuantEdge_Combined_Cloud_Policy
```

Permissions include:

* DynamoDB read/write access
* Aurora DSQL connection access
* Secure transport enforcement

### OIDC Deployment Strategy

Researched and validated Vercel → AWS OIDC federation.

This approach avoids long-lived AWS access keys and aligns with cloud security best practices.

## Architectural Decisions

### Why DynamoDB?

DynamoDB acts as a high-velocity ingestion buffer capable of absorbing regional traffic spikes without introducing transaction bottlenecks.

### Why Aurora DSQL?

Aurora DSQL provides globally coordinated transactional consistency for financial settlement workloads where correctness is more important than write throughput.

### Hybrid Database Strategy

The platform intentionally separates:

* Event ingestion
* Transaction settlement

This reduces contention and mirrors patterns used in large-scale advertising exchanges and financial platforms.

## Outcome

The cloud foundation is now in place and ready for application integration, deployment validation, and production connectivity testing.
