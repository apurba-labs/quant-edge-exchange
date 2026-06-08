CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enterprise advertisers

CREATE TABLE enterprise_accounts (
account_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
company_name VARCHAR(255) NOT NULL UNIQUE,
currency VARCHAR(10) NOT NULL DEFAULT 'USD',
current_balance DECIMAL(18,4) NOT NULL DEFAULT 100000.0000,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Available advertising inventory

CREATE TABLE ad_slots (
slot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
slot_name VARCHAR(100) NOT NULL,
target_demographic VARCHAR(100),
base_price DECIMAL(18,4) NOT NULL,
current_owner_id UUID REFERENCES enterprise_accounts(account_id),
last_settled_at TIMESTAMP WITH TIME ZONE
);

-- Incoming bids

CREATE TABLE ad_bids (
bid_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
account_id UUID NOT NULL REFERENCES enterprise_accounts(account_id),
slot_id UUID NOT NULL REFERENCES ad_slots(slot_id),
bid_amount DECIMAL(18,4) NOT NULL,
region VARCHAR(50) NOT NULL,
bid_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Settlement records

CREATE TABLE settlements (
settlement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
winning_bid_id UUID NOT NULL REFERENCES ad_bids(bid_id),
winner_account_id UUID NOT NULL REFERENCES enterprise_accounts(account_id),
slot_id UUID NOT NULL REFERENCES ad_slots(slot_id),
settlement_amount DECIMAL(18,4) NOT NULL,
settled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Conflict tracking

CREATE TABLE conflict_events (
conflict_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
slot_id UUID NOT NULL REFERENCES ad_slots(slot_id),
competing_bid_count INTEGER NOT NULL,
retry_count INTEGER NOT NULL DEFAULT 0,
resolved BOOLEAN NOT NULL DEFAULT FALSE,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial ledger

CREATE TABLE financial_ledger (
transaction_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
account_id UUID NOT NULL REFERENCES enterprise_accounts(account_id),
slot_id UUID REFERENCES ad_slots(slot_id),
amount DECIMAL(18,4) NOT NULL,
transaction_type VARCHAR(50) NOT NULL,
origin_region VARCHAR(50) NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes

CREATE INDEX idx_bids_region
ON ad_bids(region);

CREATE INDEX idx_bids_status
ON ad_bids(bid_status);

CREATE INDEX idx_bids_created_at
ON ad_bids(created_at);

CREATE INDEX idx_ledger_account
ON financial_ledger(account_id);

CREATE INDEX idx_conflict_slot
ON conflict_events(slot_id);
