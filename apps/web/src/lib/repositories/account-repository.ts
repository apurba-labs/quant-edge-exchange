import { query } from "@/lib/dsql/client";

export async function getRandomAccount() {
  const result = await query(`
    SELECT *
    FROM enterprise_accounts
    ORDER BY random()
    LIMIT 1
  `);

  if (!result.rows.length) {
    throw new Error(
      "No enterprise accounts found. Run seed data."
    );
  }

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

  if (!result.rows.length) {
    throw new Error(
      "No enterprise accounts found. Run seed data."
    );
  }

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

  if (!result.rows.length) {
    throw new Error(
      "No enterprise accounts found. Run seed data."
    );
  }

  return result.rows[0] ?? null;
}

export async function getAllAccounts() {
  const result = await query(`
    SELECT *
    FROM enterprise_accounts
    ORDER BY company_name
  `);

  if (!result.rows.length) {
    throw new Error(
      "No enterprise accounts found. Run seed data."
    );
  }

  return result.rows;
}