"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomAccount = getRandomAccount;
exports.getAccounts = getAccounts;
exports.getAccountById = getAccountById;
exports.getAllAccounts = getAllAccounts;
const client_1 = require("@/lib/dsql/client");
async function getRandomAccount() {
    const result = await (0, client_1.query)(`
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
async function getAccounts(limit = 20) {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM enterprise_accounts
    ORDER BY company_name
    LIMIT $1
    `, [limit]);
    return result.rows;
}
async function getAccountById(accountId) {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM enterprise_accounts
    WHERE account_id = $1
    `, [accountId]);
    return result.rows[0] ?? null;
}
async function getAllAccounts() {
    const result = await (0, client_1.query)(`
    SELECT *
    FROM enterprise_accounts
    ORDER BY company_name
  `);
    return result.rows;
}
//# sourceMappingURL=account-repository.js.map