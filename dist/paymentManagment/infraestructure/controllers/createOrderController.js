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
exports.CreateOrderController = void 0;
const validator_1 = require("../../domain/validator/validator");
const error_1 = require("../errors/error");
class CreateOrderController {
    constructor(useCase) {
        this.useCase = useCase;
        this.execute = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount, currencyCode, description } = req.body;
                const requiredFields = ["amount", "currencyCode"];
                const missingFields = requiredFields.filter((field) => req.body[field] === undefined);
                if (missingFields.length > 0) {
                    res.status(400).json({
                        message: "Faltan los siguientes campos obligatorios:",
                        missingFields,
                    });
                    return;
                }
                const response = yield this.useCase.execute(amount, currencyCode, description);
                res.status(201).json({ data: response, message: "Orden Creada Correctamente" });
                return;
            }
            catch (error) {
                if (error instanceof error_1.HttpError) {
                    res.status(error.httpStatus).json({ error: error.message });
                    return;
                }
                if (error instanceof validator_1.ValidationException) {
                    res.status(error.HTTP_STATUS).json({ error: error.validations });
                    return;
                }
                console.error("Error inesperado:", error);
                res.status(500).json({ error: "Error interno del servidor" });
            }
        });
    }
}
exports.CreateOrderController = CreateOrderController;
