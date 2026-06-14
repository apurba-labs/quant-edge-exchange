"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSimulation = runSimulation;
const bid_generator_1 = require("./bid-generator");
const settlement_runner_1 = require("./settlement-runner");
const traffic_profiles_1 = require("./traffic-profiles");
const core_1 = require("@quant/core");
async function runSimulation() {
    const bids = [];
    for (let i = 0; i < 10; i++) {
        const profile = traffic_profiles_1.TRAFFIC_PROFILES[Math.floor(Math.random() *
            traffic_profiles_1.TRAFFIC_PROFILES.length)];
        const bid = (0, bid_generator_1.generateBid)(profile);
        const account = await (0, core_1.getRandomAccount)();
        const slot = await (0, core_1.getRandomSlot)();
        const persistedBid = await (0, core_1.createBid)({
            accountId: account.account_id,
            slotId: slot.slot_id,
            bidAmount: bid.bidAmount,
            region: bid.region,
        });
        bids.push({
            ...bid,
            persistedBidId: persistedBid.bid_id,
            accountId: account.account_id,
            slotId: slot.slot_id,
        });
        try {
            await (0, core_1.saveBidEvent)({
                bidId: persistedBid.bid_id,
                slotId: slot.slot_id,
                region: bid.region,
                bidAmount: bid.bidAmount,
            });
        }
        catch (error) {
            console.error("❌ Failed to persist bid event", error);
        }
    }
    const winningBid = [...bids].sort((a, b) => b.qualityScore -
        a.qualityScore)[0];
    if (!winningBid.persistedBidId) {
        throw new Error("Winning bid was not persisted");
    }
    if (!winningBid.persistedBidId ||
        !winningBid.accountId ||
        !winningBid.slotId) {
        throw new Error("Winning bid missing persisted references");
    }
    await (0, core_1.createSettlement)({
        winningBidId: winningBid.persistedBidId,
        winnerAccountId: winningBid.accountId,
        slotId: winningBid.slotId,
        settlementAmount: winningBid.bidAmount,
    });
    await (0, core_1.createLedgerEntry)({
        accountId: winningBid.accountId,
        slotId: winningBid.slotId,
        amount: winningBid.bidAmount,
        transactionType: "SETTLEMENT",
        originRegion: winningBid.region,
    });
    const averageLatency = bids.reduce((sum, bid) => sum + bid.latencyMs, 0) / bids.length;
    const averageQualityScore = bids.reduce((sum, bid) => sum + bid.qualityScore, 0) / bids.length;
    const settlement = await (0, settlement_runner_1.settleBid)(winningBid);
    const totalBidAmount = bids.reduce((sum, bid) => sum + bid.bidAmount, 0);
    const averageBid = totalBidAmount / bids.length;
    let databasePersisted = false;
    try {
        await (0, core_1.saveSimulationRun)({
            totalBids: bids.length,
            averageBid,
            averageLatency,
            averageQualityScore,
            winningRegion: winningBid.region,
            winningBid: winningBid.bidAmount,
            settlementStatus: settlement.settled ? "SUCCESS" : "FAILED",
        });
        console.log("✅ Simulation persisted");
        databasePersisted = true;
    }
    catch (error) {
        console.error("❌ Failed to persist simulation", error);
    }
    return {
        totalBids: bids.length,
        averageBid: Number(averageBid.toFixed(2)),
        winningBid,
        settlement,
        averageLatency: Number(averageLatency.toFixed(2)),
        averageQualityScore: Number(averageQualityScore.toFixed(4)),
        generatedAt: new Date(),
        databasePersisted,
    };
}
//# sourceMappingURL=simulator.js.map