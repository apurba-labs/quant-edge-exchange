"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_repository_1 = require("./account-repository");
async function main() {
    const account = await (0, account_repository_1.getRandomAccount)();
    console.log(account);
}
main();
//# sourceMappingURL=test-account.js.map