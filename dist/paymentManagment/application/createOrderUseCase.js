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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderUseCase = void 0;
const createOrderData_1 = require("../domain/entities/createOrderData");
const validator_1 = require("../domain/validator/validator");
class CreateOrderUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    execute(amount, currencyCode, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderData = new createOrderData_1.CreateOrderData(amount, currencyCode, description);
            const validator = new validator_1.Validator(orderData);
            yield validator.validate();
            return yield this.repository.createOrder(orderData);
        });
    }
}
exports.CreateOrderUseCase = CreateOrderUseCase;
