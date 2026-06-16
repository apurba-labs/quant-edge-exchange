# Vercel Production Deployment Guide

## Required Services

### AWS

* Aurora DSQL Cluster
* DynamoDB Table
* IAM OIDC Role
* IAM Policy

### Vercel

* Next.js Application
* Production Environment Variables

---

## Aurora DSQL

Cluster:

```text
quant-edge-ledger-cluster
```

Required values:

```text
DSQL_ENDPOINT
AWS_REGION
```

---

## DynamoDB

Table:

```text
bid_events
```

Required values:

```text
DYNAMODB_BID_TABLE
AWS_REGION
```

---

## IAM

Role:

```text
QuantEdge_Vercel_OIDC_Role
```

Policy:

```text
QuantEdge_Combined_Cloud_Policy
```

Capabilities:

* DynamoDB ingestion
* Aurora DSQL connectivity
* Secure federated authentication

---

## Vercel Environment Variables

Required:

```text
AWS_REGION

DYNAMODB_BID_TABLE

DSQL_ENDPOINT

AWS_ROLE_ARN
```

Optional:

```text
NODE_ENV=production
```

---

## Database Initialization

Local setup:

```bash
docker compose up -d

npm run db:setup
```

Production setup:

1. Execute schema.sql
2. Execute seed.sql
3. Verify tables
4. Deploy application

Schema and seed execution should occur once during infrastructure provisioning.

They are not executed automatically by application routes.

---

## Verification Checklist

### Application

```bash
npm run build
```

Passes successfully.

### Health Endpoint

```text
/api/health
```

Returns:

```json
{
  "status": "ok"
}
```

### Simulation Endpoint

```text
/api/simulations
```

Creates:

* bids
* settlements
* ledger entries
* simulation history

### Dashboard

Verify:

* simulator metrics
* conflict telemetry
* ingestion analytics
* settlement activity

All sections should display live data after simulation runs.
