import { runSimulation } from "./simulator";

async function main() {
  const result = await runSimulation();

  console.log(result);
}

main();