"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBid = generateBid;
const network_1 = require("./network");
function generateBid(profile) {
    const latencyMs = (0, network_1.generateLatency)();
    const jitterMs = (0, network_1.generateJitter)();
    const effectiveLatency = latencyMs + jitterMs;
    const bidAmount = profile.averageBid *
        (0.8 + Math.random());
    const qualityScore = bidAmount / effectiveLatency;
    return {
        bidId: crypto.randomUUID(),
        region: profile.region,
        bidAmount,
        latencyMs,
        jitterMs,
        qualityScore,
        timestamp: new Date(),
    };
}
//# sourceMappingURL=bid-generator.js.map