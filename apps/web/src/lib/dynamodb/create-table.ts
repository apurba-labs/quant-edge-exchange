export const dynamic = "force-dynamic";
import {
  CreateTableCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb";

export async function createBidEventsTable() {
  const client =
    new DynamoDBClient({
        region: "us-east-1",
        endpoint: "http://localhost:8000",
        credentials: {
            accessKeyId: "local",
            secretAccessKey: "local",
        },
    });

    try {
        await client.send(
            new CreateTableCommand({
                TableName: "bid_events",

                AttributeDefinitions: [
                {
                    AttributeName: "PK",
                    AttributeType: "S",
                },
                {
                    AttributeName: "SK",
                    AttributeType: "S",
                },
                ],

                KeySchema: [
                {
                    AttributeName: "PK",
                    KeyType: "HASH",
                },
                {
                    AttributeName: "SK",
                    KeyType: "RANGE",
                },
                ],

                BillingMode:
                "PAY_PER_REQUEST",
            })
        );

        console.log( "✅ bid_events table created" );
    } catch (error) {
        console.error(error);
    }
}