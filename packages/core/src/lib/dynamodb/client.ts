"use server";

export const dynamic = "force-dynamic";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";

let documentClient: DynamoDBDocumentClient | null = null;

export function getDynamoClient() {
  if (documentClient) {
    return documentClient;
  }

  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    console.log("=== AWS ENVIRONMENT INJECTION CHECK ===");
    console.log("AWS_ACCESS_KEY_ID PRESENT:", !!process.env.AWS_ACCESS_KEY_ID);
    console.log("AWS_SECRET_ACCESS_KEY PRESENT:", !!process.env.AWS_SECRET_ACCESS_KEY);
    console.log("AWS_REGION:", process.env.AWS_REGION);
    console.log("=======================================");
    console.log("[DynamoDB] Initializing production client");
  }

  const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "us-east-1",

    endpoint: isProduction
      ? undefined
      : process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",

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