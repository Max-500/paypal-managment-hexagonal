"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.CreateOrderData = void 0;
const class_validator_1 = require("class-validator");
class CreateOrderData {
    constructor(amount, currencyCode, description) {
        this.amount = amount;
        this.currencyCode = currencyCode.toUpperCase();
        this.description = description;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve();
        });
    }
}
exports.CreateOrderData = CreateOrderData;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El campo 'amount' es requerido" }),
    (0, class_validator_1.IsNumber)({}, { message: "La cantidad debe ser un número válido" }),
    (0, class_validator_1.Min)(0, { message: "La cantidad no puede ser negativa" }),
    __metadata("design:type", Number)
], CreateOrderData.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "El campo 'currencyCode' es requerido" }),
    (0, class_validator_1.Length)(3, 3, { message: "El código de moneda debe tener exactamente 3 caracteres" }),
    __metadata("design:type", String)
], CreateOrderData.prototype, "currencyCode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: "La descripción no puede estar vacía si se proporciona" }),
    __metadata("design:type", String)
], CreateOrderData.prototype, "description", void 0);
