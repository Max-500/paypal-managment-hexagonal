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
exports.ValidationException = exports.Validator = void 0;
const class_validator_1 = require("class-validator");
class Validator {
    constructor(entity) {
        this.entity = entity;
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(this.entity);
            if (errors.length > 0) {
                throw new ValidationException(errors.map((error) => ({
                    property: error.property,
                    errorMessages: Object.values(error.constraints || {}),
                })));
            }
        });
    }
}
exports.Validator = Validator;
class ValidationException extends Error {
    constructor(validations) {
        super("Error de validación");
        this.HTTP_STATUS = 422;
        this.validations = validations;
    }
}
exports.ValidationException = ValidationException;
