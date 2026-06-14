"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.dynamic = void 0;
exports.query = query;
const pg_1 = require("pg");
const dsql_signer_1 = require("@aws-sdk/dsql-signer");
// Forces Next.js to evaluate this module dynamically at execution time
exports.dynamic = "force-dynamic";
const isProduction = process.env.NODE_ENV === "production";
// Fallback directly to your live AWS cluster endpoint string if process.env isn't ready
const host = isProduction
    ? (process.env.PGHOST || "z5t2lx6nzdk3ccilryg7q2dapi.dsql.us-east-1.on.aws")
    : "localhost";
exports.pool = new pg_1.Pool({
    host: host,
    port: isProduction ? 5432 : Number(process.env.PGPORT || 5433),
    database: process.env.PGDATABASE || "postgres",
    user: isProduction ? "vercel_app_role" : (process.env.PGUSER || "platform_builder"),
    password: isProduction
        ? async () => {
            const signer = new dsql_signer_1.DsqlSigner({
                hostname: host,
                region: process.env.AWS_REGION || "us-east-1",
            });
            // This fetches the secure, temporary cryptographic token via OIDC role permissions
            return signer.getDbConnectAuthToken();
        }
        : (process.env.PGPASSWORD || "local_secret_password"),
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});
async function query(text, params) {
    return exports.pool.query(text, params);
}
//# sourceMappingURL=client.js.map