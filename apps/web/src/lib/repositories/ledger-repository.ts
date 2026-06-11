import { query } from "@/lib/dsql/client";

export interface CreateLedgerEntryInput {
  accountId: string;
  slotId?: string;
  amount: number;
  transactionType: string;
  originRegion: string;
}

export async function createLedgerEntry(
  input: CreateLedgerEntryInput
) {
  const result = await query(
    `
    INSERT INTO financial_ledger (
      account_id,
      slot_id,
      amount,
      transaction_type,
      origin_region
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      input.accountId,
      input.slotId ?? null,
      input.amount,
      input.transactionType,
      input.originRegion,
    ]
  );

  return result.rows[0];
}

export async function getRecentLedgerEntries(
  limit: number = 20
) {
  const result = await query(
    `
    SELECT *
    FROM financial_ledger
    ORDER BY created_at DESC
    LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}