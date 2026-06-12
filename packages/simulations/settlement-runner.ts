import { Bid } from "./bid-generator";

export async function settleBid( bid: Bid ) {
  return {
    settled: true,
    winningBid: bid.bidAmount,
    settlementTime: new Date(),
  };
}