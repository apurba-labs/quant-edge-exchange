import { query } from "@/lib/dsql/client";

export interface CreateSettlementInput {
  winningBidId: string;
  winnerAccountId: string;
  slotId: string;
  settlementAmount: number;
}

export async function createSettlement(
  input: CreateSettlementInput
) {
  const result = await query(
    `
    INSERT INTO settlements (
      winning_bid_id,
      winner_account_id,
      slot_id,
      settlement_amount
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [
      input.winningBidId,
      input.winnerAccountId,
      input.slotId,
      input.settlementAmount,
    ]
  );

  return result.rows[0];
}

export async function getRecentSettlements(
  limit: number = 20
) {
  const result = await query(
    `
    SELECT *
    FROM settlements
    ORDER BY settled_at DESC
    LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}