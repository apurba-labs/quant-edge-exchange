"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slot_repository_1 = require("./slot-repository");
async function main() {
    const slot = await (0, slot_repository_1.getRandomSlot)();
    console.log(slot);
}
main();
//# sourceMappingURL=test-slot.js.map