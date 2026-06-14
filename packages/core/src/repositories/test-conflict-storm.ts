import {
  getRandomSlot,
} from "./slot-repository";

import {
  createConflictEvent,
} from "./conflict-event-repository";

async function run() {

  const slot = await getRandomSlot();

  const promises = [];

  for (let i = 0; i < 100; i++) {

    promises.push(
      createConflictEvent({
        slotId: slot.slot_id,
        competingBidCount:
          Math.floor(
            Math.random() * 50
          ) + 1,
        retryCount:
          Math.floor(
            Math.random() * 5
          ),
        resolved: true,
      })
    );
  }

  const results =
    await Promise.all(promises);

  console.log( "Storm Complete" );

  console.log( "Events:", results.length );
}

run();