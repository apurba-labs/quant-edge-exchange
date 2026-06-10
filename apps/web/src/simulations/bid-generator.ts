import {
  TrafficProfile,
} from "./traffic-profiles";

import {
  generateLatency,
  generateJitter,
} from "./network";

export interface Bid {
  bidId: string;
  accountId: string;
  slotId: string;
  region: string;
  bidAmount: number;
  latencyMs: number;
  jitterMs: number;
  qualityScore: number;
  timestamp: Date;
}

export function generateBid(
  profile: TrafficProfile
): Bid {

  const latencyMs = generateLatency();
  const jitterMs = generateJitter();

  const effectiveLatency = latencyMs + jitterMs;

  const bidAmount = profile.averageBid * (0.8 + Math.random());

  const qualityScore = bidAmount / effectiveLatency;

  return {
    bidId: crypto.randomUUID(),
    accountId: `ACC-${Math.floor(Math.random() * 1000)}`,
    slotId: `SLOT-${Math.floor(Math.random() * 100)}`,
    region: profile.region,
    bidAmount,
    latencyMs,
    jitterMs,
    qualityScore,
    timestamp: new Date(),
  };
}