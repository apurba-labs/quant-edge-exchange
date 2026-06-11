export const dynamoConfig = {
  endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
  region: process.env.AWS_REGION || "us-east-1",
};