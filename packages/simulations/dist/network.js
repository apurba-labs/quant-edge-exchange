"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLatency = generateLatency;
exports.generateJitter = generateJitter;
function generateLatency() {
    return Math.floor(20 + Math.random() * 180);
}
function generateJitter() {
    return Math.floor(Math.random() * 50);
}
//# sourceMappingURL=network.js.map