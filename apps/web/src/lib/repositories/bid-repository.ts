import { query } from "@/lib/dsql/client";

export interface CreateBidInput {
  accountId: string;
  slotId: string;
  bidAmount: number;
  region: string;
}

export async function createBid(
  input: CreateBidInput
) {
  const result = await query(
    `
    INSERT INTO ad_bids (
      account_id,
      slot_id,
      bid_amount,
      region
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      input.accountId,
      input.slotId,
      input.bidAmount,
      input.region,
    ]
  );

  return result.rows[0];
}

export async function getRecentBids(
  limit: number = 20
) {
  const result = await query(
    `
    SELECT *
    FROM ad_bids
    ORDER BY created_at DESC
    LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}

export async function getLatestBid() {

  const result = await query(
    `
    SELECT *
    FROM ad_bids
    ORDER BY created_at DESC
    LIMIT 1
    `
  );

  return result.rows[0];
}