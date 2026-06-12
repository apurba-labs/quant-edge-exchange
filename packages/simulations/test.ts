import { runSimulation } from "@quant/simulations";

async function main() {
  const result = await runSimulation();

  console.log(result);
}

main();