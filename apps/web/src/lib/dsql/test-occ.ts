import {
  withRetry,
} from "./retry";

let attemptCount = 0;

async function simulatedTransaction() {

  attemptCount++;

  console.log(
    `Transaction Attempt ${attemptCount}`
  );

  if (attemptCount < 3) {

    const error: any =
      new Error(
        "Serialization Failure"
      );

    error.code = "40001";

    throw error;
  }

  return {
    success: true,
  };
}

async function run() {

  const result =
    await withRetry(
      simulatedTransaction
    );

  console.log(
    "✅ Transaction Completed"
  );

  console.log(
    result
  );
}

run();