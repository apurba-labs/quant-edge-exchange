import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

// Force Next.js to treat this module execution context dynamically
export const dynamic = "force-dynamic";

let documentClient: DynamoDBDocumentClient | null = null;

export function getDynamoClient() {
  if (documentClient) {
    return documentClient;
  }

  const isProduction = process.env.NODE_ENV === "production";

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",

    endpoint: isProduction
      ? undefined
      : (process.env.DYNAMODB_ENDPOINT || "http://localhost:8000"),

    // 💡 CRITICAL HANDSHAKE: Force AWS SDK to pick up Vercel's federated OIDC token roles
    credentials: isProduction
      ? fromNodeProviderChain()
      : {
          accessKeyId: "local",
          secretAccessKey: "local",
        },
  });

  documentClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });

  return documentClient;
}

export const BID_EVENTS_TABLE = process.env.DYNAMODB_BID_TABLE || "bid_events";