"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
async function withRetry(operation, maxRetries = 5, baseDelayMs = 100) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        }
        catch (error) {
            lastError = error;
            const isSerializationFailure = error?.code === "40001";
            if (!isSerializationFailure || attempt === maxRetries) {
                throw error;
            }
            const exponentialDelay = baseDelayMs * Math.pow(2, attempt);
            const jitterDelay = Math.floor(Math.random() * exponentialDelay);
            console.warn(`⚡ OCC Retry ${attempt}/${maxRetries} (${jitterDelay}ms)`);
            await new Promise((resolve) => setTimeout(resolve, jitterDelay));
        }
    }
    throw lastError;
}
//# sourceMappingURL=retry.js.map