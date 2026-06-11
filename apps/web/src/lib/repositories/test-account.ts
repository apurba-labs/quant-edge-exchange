import {
  getRandomAccount,
} from "./account-repository";

async function main() {
  const account =
    await getRandomAccount();

  console.log(account);
}

main();