export const dynamoConfig = {
  tableName: process.env.DYNAMODB_BID_TABLE || "bid_events",

  region: process.env.AWS_REGION || "us-east-1",

  endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
};