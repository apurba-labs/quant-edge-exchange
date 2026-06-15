export const dynamic = "force-dynamic";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

let documentClient: DynamoDBDocumentClient | null = null;
let clientError: Error | null = null;
let initAttempted = false;

export function getDynamoClient() {
  // Return cached client if successful
  if (documentClient) {
    return documentClient;
  }

  // Throw cached error to avoid repeated failures
  if (clientError && initAttempted) {
    throw clientError;
  }

  const isProduction = process.env.NODE_ENV === "production";

  // Skip initialization during build when credentials are unavailable
  if (isProduction && !process.env.AWS_ACCESS_KEY_ID) {
    const buildError = new Error(
      "AWS credentials not available - this is expected during build. " +
      "DynamoDB client will be initialized at runtime when credentials are available."
    );
    clientError = buildError;
    initAttempted = true;
    // Don't throw during build - return null and handle gracefully
    return null as any;
  }

  try {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || "us-east-1",
      endpoint: isProduction ? undefined : process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
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

    initAttempted = true;
    return documentClient;
  } catch (error) {
    clientError = error instanceof Error ? error : new Error(String(error));
    initAttempted = true;
    throw clientError;
  }
}

export const BID_EVENTS_TABLE = process.env.DYNAMODB_BID_TABLE || "bid_events";