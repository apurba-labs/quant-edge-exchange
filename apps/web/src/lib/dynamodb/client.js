"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BID_EVENTS_TABLE = exports.dynamic = void 0;
exports.getDynamoClient = getDynamoClient;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const credential_providers_1 = require("@aws-sdk/credential-providers");
// Force Next.js to treat this module execution context dynamically
exports.dynamic = "force-dynamic";
let documentClient = null;
function getDynamoClient() {
    if (documentClient) {
        return documentClient;
    }
    const isProduction = process.env.NODE_ENV === "production";
    const client = new client_dynamodb_1.DynamoDBClient({
        region: process.env.AWS_REGION || "us-east-1",
        endpoint: isProduction
            ? undefined
            : (process.env.DYNAMODB_ENDPOINT || "http://localhost:8000"),
        // 💡 CRITICAL HANDSHAKE: Force AWS SDK to pick up Vercel's federated OIDC token roles
        credentials: isProduction
            ? (0, credential_providers_1.fromNodeProviderChain)()
            : {
                accessKeyId: "local",
                secretAccessKey: "local",
            },
    });
    documentClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client, {
        marshallOptions: {
            removeUndefinedValues: true,
        },
    });
    return documentClient;
}
exports.BID_EVENTS_TABLE = process.env.DYNAMODB_BID_TABLE || "bid_events";
//# sourceMappingURL=client.js.map