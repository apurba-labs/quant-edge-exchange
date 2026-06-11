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
} from "../lib/repositories/simulation-repository";

export async function runSimulation() {

    const bids: Bid[] = [];

    for (let i = 0; i < 10; i++) {

        const profile = TRAFFIC_PROFILES[
            Math.floor(
            Math.random() *
            TRAFFIC_PROFILES.length
            )
        ];

        bids.push(
            generateBid(
                profile
            )
        );
    }

    const winningBid = [...bids].sort( (a, b) =>
            b.qualityScore -
            a.qualityScore
        )[0];

    const averageLatency =bids.reduce(
            (sum, bid) =>
            sum + bid.latencyMs,
            0
        ) / bids.length;

    const averageQualityScore = bids.reduce(
        (sum, bid) =>
        sum + bid.qualityScore,
        0
    ) / bids.length;

    const settlement = await settleBid( winningBid );

    const totalBidAmount = bids.reduce( (sum, bid) =>
            sum + bid.bidAmount,
            0
        );

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
            settlementStatus: settlement.settled
                ? "SUCCESS"
                : "FAILED",
        });

        console.log(
            "✅ Simulation persisted"
        );

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