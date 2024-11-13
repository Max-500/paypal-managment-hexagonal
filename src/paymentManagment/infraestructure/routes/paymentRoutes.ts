import { Router } from "express";
import { createOrderController } from "../dependencies";

export const paymentRouter: Router = Router();

paymentRouter.post('/create-order', createOrderController.execute.bind(createOrderController));