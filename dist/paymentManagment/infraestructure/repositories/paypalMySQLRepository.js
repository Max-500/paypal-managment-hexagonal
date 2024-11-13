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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalMySQLRepository = void 0;
const axios_1 = __importDefault(require("axios"));
const paymentOrder_1 = require("../../domain/entities/paymentOrder");
const error_1 = require("../errors/error");
process.loadEnvFile();
class PaypalMySQLRepository {
    constructor() {
        this.CLIENT_ID = process.env.CLIENT_ID || 'no-clientID';
        this.BASE_URL = process.env.BASE_URL || 'no-base-url';
        this.SECRET = process.env.SECRET || 'no-secret';
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.BASE_URL);
            const response = yield (0, axios_1.default)({
                url: `${this.BASE_URL}/v1/oauth2/token`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: this.CLIENT_ID,
                    password: this.SECRET,
                },
                data: 'grant_type=client_credentials',
            });
            return response.data.access_token;
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const token = yield this.getAccessToken();
                const response = yield (0, axios_1.default)({
                    url: `${this.BASE_URL}/v2/checkout/orders`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    data: JSON.stringify({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: order.currencyCode.toString(),
                                    value: order.amount.toString(),
                                },
                            },
                        ],
                    }),
                });
                const { id, status, links } = response.data;
                return new paymentOrder_1.PaymentOrder(id, status, links);
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    const axiosError = error;
                    const status = ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) || 500;
                    const message = ((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.data) || axiosError.message;
                    throw new error_1.HttpError(`PayPal API Error: ${message}`, status);
                }
                throw new error_1.HttpError("Error inesperado al crear la orden.", 500);
            }
        });
    }
}
exports.PaypalMySQLRepository = PaypalMySQLRepository;
