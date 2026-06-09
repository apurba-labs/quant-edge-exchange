import {
  TrafficProfile,
} from "./traffic-profiles";

export interface Bid {
  bidId: string;
  accountId: string;
  slotId: string;
  region: string;
  bidAmount: number;
  timestamp: Date;
}

export function generateBid(
  profile: TrafficProfile
): Bid {

  return {
    bidId: crypto.randomUUID(),
    accountId: "ACC-001",
    slotId: "SLOT-001",
    region: profile.region,

    bidAmount:
      profile.averageBid +
      Math.random(),

    timestamp: new Date(),
  };
}