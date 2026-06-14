import { query } from "../lib/dsql/client";

export async function getRandomAccount() {
  const result = await query(`
    SELECT
      account_id,
      company_name,
      current_balance
    FROM enterprise_accounts
    ORDER BY RANDOM()
    LIMIT 1
  `);

  return result.rows[0];
}

export async function getAccounts(
  limit: number = 20
) {
  const result = await query(
    `
    SELECT *
    FROM enterprise_accounts
    ORDER BY company_name
    LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}

export async function getAccountById(
  accountId: string
) {
  const result = await query(
    `
    SELECT *
    FROM enterprise_accounts
    WHERE account_id = $1
    `,
    [accountId]
  );

  return result.rows[0] ?? null;
}

export async function getAllAccounts() {
  const result = await query(`
    SELECT *
    FROM enterprise_accounts
    ORDER BY company_name
  `);

  return result.rows;
}