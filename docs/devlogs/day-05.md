# Day 05 - Bid Simulation Engine

## Objective

Build the first working version of the Quant Edge Exchange simulation engine.

## Completed

### Traffic Profiles

Created regional traffic profiles to simulate exchange activity across multiple geographic regions:

- us-east-1
- eu-west-1
- ap-southeast-1
- sa-east-1

Each profile contains request volume and average bid characteristics.

### Bid Generator

Implemented bid generation functionality that produces synthetic exchange bids with:

- bid identifiers
- account identifiers
- slot identifiers
- region information
- bid amount
- timestamps

### Settlement Workflow

Implemented the initial settlement engine responsible for:

- selecting a winning bid
- executing settlement
- returning settlement results

### Simulation Runner

Created the simulation orchestration layer.

Current workflow:

```text
Generate Bids
      ↓
Select Winner
      ↓
Execute Settlement
      ↓
Return Metrics