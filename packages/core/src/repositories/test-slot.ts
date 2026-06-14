import {
  getRandomSlot,
} from "./slot-repository";

async function main() {
  const slot =
    await getRandomSlot();

  console.log(slot);
}

main();