import { query } from "@/lib/dsql/client";
import { withRetry } from "@/lib/dsql/retry";
import { pool } from "@/lib/dsql/client";

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

export async function createSettlementWithRetry(
  input: CreateSettlementInput
) {

  return withRetry(async () => {

    const client = await pool.connect();

    try {

      await client.query(
        "BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE"
      );

      const result = await client.query(
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

      await client.query( "COMMIT" );

      return result.rows[0];

    } catch (error: any) {

        await client.query( "ROLLBACK" );
        
        if ( typeof error === "object" && error !== null && "code" in error ) {

            const pgError = error as {
                code: string;
            };

            if (pgError.code === "23505") {

                console.log(
                    "⚠️ Duplicate settlement prevented"
                );

                return null;
            }
        }
        throw error;

    } finally {
      client.release();
    }
  });
}