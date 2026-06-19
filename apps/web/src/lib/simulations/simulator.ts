import {
  generateBid,
  Bid,
} from "./bid-generator";

import {
  settleBid,
} from "./settlement-runner";

import {
  TRAFFIC_PROFILES,
} from "./traffic-profiles";

import {
  saveSimulationRun,
  saveBidEvent,
  createBid,
  createSettlement,
  createLedgerEntry,
  getRandomAccount,
  getRandomSlot
} from "@/lib/repositories";

import {
  createConflictEvent,
} from "@/lib/repositories";

const CONFLICT_PROBABILITY = 0.6;

export async function runSimulation() {

    const bids: Bid[] = [];

    for (let i = 0; i < 10; i++) {

        const profile = TRAFFIC_PROFILES[
            Math.floor(
                Math.random() *
                TRAFFIC_PROFILES.length
            )
        ];

        const bid = generateBid(profile);

        const account = await getRandomAccount();

        if (!account) {
            throw new Error(
                "Account lookup returned undefined"
            );
        }

        const slot = await getRandomSlot();

        if (!slot) {
            throw new Error(
                "Slot lookup returned undefined"
            );
        }

        const persistedBid = await createBid({
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

            await saveBidEvent({
                bidId: persistedBid.bid_id,
                slotId: slot.slot_id,
                region: bid.region,
                bidAmount: bid.bidAmount,
            });

        } catch (error) {

            console.error(
                "❌ Failed to persist bid event",
                error
            );
        }
    }

    const winningBid = [...bids].sort( (a, b) =>
            b.qualityScore -
            a.qualityScore
        )[0];

    if (!winningBid.persistedBidId) {
        throw new Error(
            "Winning bid was not persisted"
        );
    }

    if (
        !winningBid.persistedBidId ||
        !winningBid.accountId ||
        !winningBid.slotId
    ) {
        throw new Error(
            "Winning bid missing persisted references"
        );
    }

    // Simulate Aurora DSQL serialization conflicts
    if (Math.random() < CONFLICT_PROBABILITY) {

        const retryCount = Math.floor(Math.random() * 5) + 1;

        await createConflictEvent({
            slotId: winningBid.slotId!,
            competingBidCount: bids.length,
            retryCount,
            resolved: true,
        });

        console.log(
            `⚠️ Simulated conflict (${retryCount} retries)`
        );
    }
    
    await createSettlement({
        winningBidId: winningBid.persistedBidId!,
        winnerAccountId:winningBid.accountId!,
        slotId:winningBid.slotId!,
        settlementAmount:winningBid.bidAmount,
    });

    await createLedgerEntry({
        accountId:winningBid.accountId!,
        slotId:winningBid.slotId!,
        amount:winningBid.bidAmount,
        transactionType:"SETTLEMENT",
        originRegion:winningBid.region,
    });

    const averageLatency =bids.reduce(
            (sum, bid) =>
            sum + bid.latencyMs,
            0
        ) / bids.length;

    const averageQualityScore = bids.reduce((sum, bid) => sum + bid.qualityScore, 0 ) / bids.length;

    const settlement = await settleBid( winningBid );

    const totalBidAmount = bids.reduce( (sum, bid) => sum + bid.bidAmount, 0 );

    const averageBid = totalBidAmount / bids.length;

    let databasePersisted = false;
    try {
        await saveSimulationRun({
            totalBids: bids.length,
            averageBid,
            averageLatency,
            averageQualityScore,
            winningRegion: winningBid.region,
            winningBid: winningBid.bidAmount,
            settlementStatus: settlement.settled ? "SUCCESS" : "FAILED",
        });

        console.log( "✅ Simulation persisted" );

        databasePersisted = true;

    } catch (error) {

        console.error(
            "❌ Failed to persist simulation",
            error
        );

    }

    return {
        totalBids: bids.length,
        averageBid: Number( averageBid.toFixed(2) ),
        winningBid,
        settlement,
        averageLatency: Number(
            averageLatency.toFixed(2)
        ),
        averageQualityScore: Number(
            averageQualityScore.toFixed(4)
        ),
        generatedAt:new Date(),
        databasePersisted,
    };
}