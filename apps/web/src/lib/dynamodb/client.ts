export const dynamic = "force-dynamic";

let documentClient: any = null;
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
    // Lazy import to avoid loading AWS SDK during build
    const DDB = require("@aws-sdk/client-dynamodb").DynamoDBClient;
    const DocClient = require("@aws-sdk/lib-dynamodb").DynamoDBDocumentClient;
    const credentialsProvider = require("@aws-sdk/credential-providers").fromNodeProviderChain;

    const client = new DDB({
      region: process.env.AWS_REGION || "us-east-1",
      endpoint: isProduction ? undefined : process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
      credentials: isProduction
        ? credentialsProvider()
        : {
            accessKeyId: "local",
            secretAccessKey: "local",
          },
    });

    documentClient = DocClient.from(client, {
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
