import { Router } from "express";
import { captureOrderController, createOrderController } from "../dependencies";

export const paymentRouter: Router = Router();

paymentRouter.post('/create-order', createOrderController.execute.bind(createOrderController));
paymentRouter.post('/capture-order', captureOrderController.execute.bind(captureOrderController));