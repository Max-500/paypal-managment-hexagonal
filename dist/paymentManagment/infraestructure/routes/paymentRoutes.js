"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const dependencies_1 = require("../dependencies");
exports.paymentRouter = (0, express_1.Router)();
exports.paymentRouter.post('/create-order', dependencies_1.createOrderController.execute.bind(dependencies_1.createOrderController));
