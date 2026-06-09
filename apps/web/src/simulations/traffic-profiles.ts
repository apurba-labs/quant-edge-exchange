export interface TrafficProfile {
  region: string;
  requestsPerMinute: number;
  averageBid: number;
}

export const TRAFFIC_PROFILES: TrafficProfile[] = [
  {
    region: "us-east-1",
    requestsPerMinute: 5000,
    averageBid: 1.25,
  },
  {
    region: "eu-west-1",
    requestsPerMinute: 3200,
    averageBid: 1.20,
  },
  {
    region: "ap-southeast-1",
    requestsPerMinute: 2200,
    averageBid: 1.15,
  },
  {
    region: "sa-east-1",
    requestsPerMinute: 1200,
    averageBid: 1.00,
  },
];