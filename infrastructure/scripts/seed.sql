/*
================================================================================
        Quant Edge Exchange
        Canonical Schema
        Aurora DSQL + PostgreSQL Compatible
================================================================================
SAMPLE DATA INSERTION (WORKS FOR BOTH ENVIRONMENTS)
================================================================================
Use these INSERT statements to populate the database with test data.
The ON CONFLICT clauses make these statements idempotent (safe to run multiple times).
*/

-- Perfect for Aurora DSQL
INSERT INTO enterprise_accounts (
    company_name,
    current_balance
)
VALUES
    ('Nike', 1000000.00),
    ('Samsung', 1000000.00),
    ('Tesla', 1000000.00),
    ('Netflix', 1000000.00),
    ('Amazon', 1000000.00)
ON CONFLICT (company_name) DO NOTHING;

-- Even more explicit conflict handling for ad_slots
INSERT INTO ad_slots (
    slot_name,
    target_demographic,
    base_price
)
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
ON CONFLICT (slot_name) DO NOTHING;  -- More specific if slot_name should be unique
