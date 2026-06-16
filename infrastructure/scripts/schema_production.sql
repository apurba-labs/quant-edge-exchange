/*
================================================================================
        Quant Edge Exchange
        Canonical Schema
        Aurora DSQL + PostgreSQL Compatible
================================================================================

This script creates the complete database schema for an advertising auction platform.
It supports both local development (PostgreSQL 16) and production (Aurora DSQL).

ENVIRONMENTS:
- LOCAL: PostgreSQL 16 (with foreign keys and extensions)
- PRODUCTION: Aurora DSQL (distributed, serverless, no foreign keys)

USAGE INSTRUCTIONS:
================================================================================

FOR LOCAL DEVELOPMENT (PostgreSQL 16):
--------------------------------------
1. Ensure PostgreSQL 16 is installed and running
2. Connect to your database: psql -U username -d database_name
3. Run this entire script as-is
4. All foreign keys and constraints will be enforced at database level
5. Performance indexes are included for optimal query performance

FOR PRODUCTION (Aurora DSQL):
-----------------------------
1. Create Aurora DSQL cluster in AWS Console
2. Connect using Aurora DSQL Query Editor or psql with IAM auth
3. Use the "AURORA DSQL VERSION" section below (commented out by default)
4. Foreign key relationships must be enforced in application code
5. Indexes are created asynchronously for zero-downtime deployment

SCHEMA OVERVIEW:
================================================================================
- enterprise_accounts: Advertiser companies and their balances
- ad_slots: Available advertising inventory (banner positions, etc.)
- ad_bids: Real-time bidding requests from advertisers
- settlements: Final auction results and payments
- conflict_events: Tracking for bid conflicts and retries
- financial_ledger: Complete audit trail of all financial transactions
- simulation_runs: Performance metrics and testing data

RELATIONSHIPS:
- Advertisers place bids on ad slots
- Winning bids create settlements
- All financial activity is logged in the ledger
- Conflicts are tracked for system reliability

================================================================================
*/

/*
================================================================================
AURORA DSQL VERSION (PRODUCTION)
================================================================================
Uncomment and use this section for Aurora DSQL deployment.
Comment out the PostgreSQL version above when deploying to production.

Key differences:
- No CREATE EXTENSION (built-in UUID support)
- gen_random_uuid() instead of uuid_generate_v4()
- No REFERENCES (foreign keys) - enforce in application code
- CREATE INDEX ASYNC for non-blocking index creation
- Optimized for distributed, serverless architecture

-- No extension needed - Aurora DSQL has built-in UUID support
*/
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
    slot_name VARCHAR(100) NOT NULL UNIQUE,
    target_demographic VARCHAR(100),
    base_price DECIMAL(18,4) NOT NULL,
    current_owner_id UUID, -- No foreign key - enforce in application
    last_settled_at TIMESTAMP WITH TIME ZONE
);

-- Incoming bids
CREATE TABLE ad_bids (
    bid_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL, -- No foreign key - enforce in application
    slot_id UUID NOT NULL, -- No foreign key - enforce in application
    bid_amount DECIMAL(18,4) NOT NULL,
    region VARCHAR(50) NOT NULL,
    bid_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Settlement records
CREATE TABLE settlements (
    settlement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    winning_bid_id UUID NOT NULL, -- No foreign key - enforce in application
    winner_account_id UUID NOT NULL, -- No foreign key - enforce in application
    slot_id UUID NOT NULL, -- No foreign key - enforce in application
    settlement_amount DECIMAL(18,4) NOT NULL,
    settled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_winning_bid UNIQUE (winning_bid_id)
);

-- Conflict tracking
CREATE TABLE conflict_events (
    conflict_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_id UUID NOT NULL, -- No foreign key - enforce in application
    competing_bid_count INTEGER NOT NULL,
    retry_count INTEGER NOT NULL DEFAULT 0,
    resolved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Financial ledger
CREATE TABLE financial_ledger (
    transaction_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL, -- No foreign key - enforce in application
    slot_id UUID, -- No foreign key - enforce in application
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

-- Asynchronous indexes for Aurora DSQL (non-blocking creation)
CREATE INDEX ASYNC IF NOT EXISTS idx_bids_region ON ad_bids(region);
CREATE INDEX ASYNC IF NOT EXISTS idx_bids_status ON ad_bids(bid_status);
CREATE INDEX ASYNC IF NOT EXISTS idx_bids_created_at ON ad_bids(created_at);
CREATE INDEX ASYNC IF NOT EXISTS idx_ledger_account ON financial_ledger(account_id);
CREATE INDEX ASYNC IF NOT EXISTS idx_conflict_slot ON conflict_events(slot_id);


/*
================================================================================
SAMPLE DATA INSERTION (WORKS FOR BOTH ENVIRONMENTS)
================================================================================
Use these INSERT statements to populate the database with test data.
The ON CONFLICT clauses make these statements idempotent (safe to run multiple times).


-- Insert sample enterprise accounts
INSERT INTO enterprise_accounts (company_name, current_balance)
VALUES
    ('Nike', 1000000.00),
    ('Samsung', 1000000.00),
    ('Tesla', 1000000.00),
    ('Netflix', 1000000.00),
    ('Amazon', 1000000.00)
ON CONFLICT (company_name) DO NOTHING;

-- Insert sample ad slots
INSERT INTO ad_slots (slot_name, target_demographic, base_price)
VALUES
    ('Homepage Banner', 'Global Audience', 50.00),
    ('Sports Feed Premium', 'Sports Fans', 75.00),
    ('Finance Insights Panel', 'Investors', 90.00),
    ('Tech News Hero', 'Technology', 110.00),
    ('Entertainment Spotlight', 'Streaming Audience', 60.00),
    ('Gaming Frontpage', 'Gamers', 120.00),
    ('Mobile App Banner', 'Mobile Users', 45.00),
    ('Video Pre-Roll', 'Video Consumers', 140.00),
    ('Marketplace Search Slot', 'Shoppers', 85.00),
    ('Regional Trending Slot', 'Local Audience', 55.00)
ON CONFLICT (slot_id) DO NOTHING;
*/
/*
================================================================================
DEPLOYMENT CHECKLIST
================================================================================

LOCAL DEVELOPMENT:
☐ PostgreSQL 16 installed and running
☐ Database created
☐ Run PostgreSQL version of schema
☐ Verify foreign key constraints are working
☐ Insert sample data
☐ Test application connectivity

AURORA DSQL PRODUCTION:
☐ Aurora DSQL cluster created in AWS
☐ IAM permissions configured for database access
☐ Application configured for IAM authentication
☐ Run Aurora DSQL version of schema (uncommented)
☐ Verify indexes are created asynchronously
☐ Implement referential integrity checks in application code
☐ Insert sample data
☐ Test application connectivity and performance
☐ Monitor Aurora DSQL metrics in CloudWatch

MIGRATION FROM LOCAL TO PRODUCTION:
☐ Export data from PostgreSQL (pg_dump)
☐ Transform foreign key relationships to application logic
☐ Import data to Aurora DSQL
☐ Update application configuration
☐ Test all CRUD operations
☐ Verify performance with production load

================================================================================
*/
