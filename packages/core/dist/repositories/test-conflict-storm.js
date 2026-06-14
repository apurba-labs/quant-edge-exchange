"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slot_repository_1 = require("./slot-repository");
const conflict_event_repository_1 = require("./conflict-event-repository");
async function run() {
    const slot = await (0, slot_repository_1.getRandomSlot)();
    const promises = [];
    for (let i = 0; i < 100; i++) {
        promises.push((0, conflict_event_repository_1.createConflictEvent)({
            slotId: slot.slot_id,
            competingBidCount: Math.floor(Math.random() * 50) + 1,
            retryCount: Math.floor(Math.random() * 5),
            resolved: true,
        }));
    }
    const results = await Promise.all(promises);
    console.log("Storm Complete");
    console.log("Events:", results.length);
}
run();
//# sourceMappingURL=test-conflict-storm.js.map