import {
  TrafficProfile,
} from "./traffic-profiles";

import {
  generateLatency,
  generateJitter,
} from "./network";

export interface Bid {
  bidId: string;
  region: string;
  bidAmount: number;
  latencyMs: number;
  jitterMs: number;
  qualityScore: number;
  timestamp: Date;

  accountId?: string;
  slotId?: string;

  persistedBidId?: string;
}

export function generateBid(
  profile: TrafficProfile
): Bid {

  const latencyMs = generateLatency();
  const jitterMs = generateJitter();

  const effectiveLatency =
    latencyMs + jitterMs;

  const bidAmount =
    profile.averageBid *
    (0.8 + Math.random());

  const qualityScore =
    bidAmount / effectiveLatency;

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