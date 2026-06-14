"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettlement = createSettlement;
exports.getRecentSettlements = getRecentSettlements;
exports.createSettlementWithRetry = createSettlementWithRetry;
var client_1 = require("@/lib/dsql/client");
var retry_1 = require("@/lib/dsql/retry");
var client_2 = require("@/lib/dsql/client");
function createSettlement(input) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, client_1.query)("\n    INSERT INTO settlements (\n      winning_bid_id,\n      winner_account_id,\n      slot_id,\n      settlement_amount\n    )\n    VALUES ($1, $2, $3, $4)\n    RETURNING *\n    ", [
                        input.winningBidId,
                        input.winnerAccountId,
                        input.slotId,
                        input.settlementAmount,
                    ])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows[0]];
            }
        });
    });
}
function getRecentSettlements() {
    return __awaiter(this, arguments, void 0, function (limit) {
        var result;
        if (limit === void 0) { limit = 20; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, client_1.query)("\n    SELECT *\n    FROM settlements\n    ORDER BY settled_at DESC\n    LIMIT $1\n    ", [limit])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result.rows];
            }
        });
    });
}
function createSettlementWithRetry(input) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, (0, retry_1.withRetry)(function () { return __awaiter(_this, void 0, void 0, function () {
                    var client, result, error_1, pgError;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, client_2.pool.connect()];
                            case 1:
                                client = _a.sent();
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 6, 8, 9]);
                                return [4 /*yield*/, client.query("BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE")];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, client.query("\n          INSERT INTO settlements (\n            winning_bid_id,\n            winner_account_id,\n            slot_id,\n            settlement_amount\n          )\n          VALUES ($1, $2, $3, $4)\n          RETURNING *\n          ", [
                                        input.winningBidId,
                                        input.winnerAccountId,
                                        input.slotId,
                                        input.settlementAmount,
                                    ])];
                            case 4:
                                result = _a.sent();
                                return [4 /*yield*/, client.query("COMMIT")];
                            case 5:
                                _a.sent();
                                return [2 /*return*/, result.rows[0]];
                            case 6:
                                error_1 = _a.sent();
                                return [4 /*yield*/, client.query("ROLLBACK")];
                            case 7:
                                _a.sent();
                                if (typeof error_1 === "object" && error_1 !== null && "code" in error_1) {
                                    pgError = error_1;
                                    if (pgError.code === "23505") {
                                        console.log("⚠️ Duplicate settlement prevented");
                                        return [2 /*return*/, null];
                                    }
                                }
                                throw error_1;
                            case 8:
                                client.release();
                                return [7 /*endfinally*/];
                            case 9: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
