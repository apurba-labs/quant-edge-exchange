-- ==========================================
-- Quant Edge Exchange
-- Canonical Schema
-- Aurora DSQL + PostgreSQL Compatible
-- ==========================================


-- Enterprise advertisers
CREATE TABLE enterprise_accounts (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL UNIQUE,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    current_balance DECIMAL(18,4) NOT NULL DEFAULT 100000.0000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Available advertising inventory
CREATE TABLE ad_slots (
    slot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_name VARCHAR(100) NOT NULL,
    target_demographic VARCHAR(100),
    base_price DECIMAL(18,4) NOT NULL,
    current_owner_id UUID,
    last_settled_at TIMESTAMP WITH TIME ZONE
);

-- Incoming bids
CREATE TABLE ad_bids (
    bid_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL,
    slot_id UUID NOT NULL,
    bid_amount DECIMAL(18,4) NOT NULL,
    region VARCHAR(50) NOT NULL,
    bid_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Settlement records
CREATE TABLE settlements (
    settlement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    winning_bid_id UUID NOT NULL,
    winner_account_id UUID NOT NULL,
    slot_id UUID NOT NULL,
    settlement_amount DECIMAL(18,4) NOT NULL,
    settled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_winning_bid UNIQUE (winning_bid_id)
);

-- Conflict tracking
CREATE TABLE conflict_events (
    conflict_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID NOT NULL,
    competing_bid_count INTEGER NOT NULL,
    retry_count INTEGER NOT NULL DEFAULT 0,
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial ledger
CREATE TABLE financial_ledger (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL,
    slot_id UUID,
    amount DECIMAL(18,4) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL,
    origin_region VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Simulation runs 
CREATE TABLE simulation_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_bids INTEGER NOT NULL,
    average_bid DECIMAL(18,4) NOT NULL,
    average_latency DECIMAL(18,4) NOT NULL,
    average_quality_score DECIMAL(18,6) NOT NULL,
    winning_region VARCHAR(50) NOT NULL,
    winning_bid DECIMAL(18,4) NOT NULL,
    settlement_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes (Aurora DSQL requires ASYNC for non-blocking creation)
CREATE INDEX ASYNC idx_bids_region ON ad_bids(region);
CREATE INDEX ASYNC idx_bids_status ON ad_bids(bid_status);
CREATE INDEX ASYNC idx_bids_created_at ON ad_bids(created_at);
CREATE INDEX ASYNC idx_ledger_account ON financial_ledger(account_id);
CREATE INDEX ASYNC idx_conflict_slot ON conflict_events(slot_id);
