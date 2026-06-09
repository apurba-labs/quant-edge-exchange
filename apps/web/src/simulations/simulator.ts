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

export async function runSimulation() {

    const bids: Bid[] = [];

    for (let i = 0; i < 10; i++) {

        const profile =
        TRAFFIC_PROFILES[
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

    const winningBid =
        bids.sort(
        (a, b) =>
            b.bidAmount -
            a.bidAmount
        )[0];

    const settlement =
        await settleBid(
        winningBid
        );

    const totalBidAmount =
        bids.reduce(
        (sum, bid) =>
            sum + bid.bidAmount,
        0
        );

    const averageBid = totalBidAmount / bids.length;

    return {
        totalBids: bids.length,

        averageBid:
        Number(
            averageBid.toFixed(2)
        ),

        winningBid,

        settlement,

        generatedAt:
        new Date(),
    };
}