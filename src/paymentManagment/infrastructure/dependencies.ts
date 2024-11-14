import { CaptureOrderUseCase } from "../application/captureOrderUseCase";
import { CreateOrderUseCase } from "../application/createOrderUseCase";
import { CaptureOrderController } from "./controllers/captureOrderController";
import { CreateOrderController } from "./controllers/createOrderController";
import { AppDataSource } from "./database/data-source";
import { Order } from "./database/models/Order";
import { PaymentMySQLRepository } from "./repositories/paymentMySQLRepository";
import { PaypalGateway } from "./repositories/paypalGateway";

const paypalGateway: PaypalGateway = new PaypalGateway();

const orderRepository = AppDataSource.getRepository(Order);
const paymentRepository = new PaymentMySQLRepository(orderRepository);

const createOrderUseCase: CreateOrderUseCase = new CreateOrderUseCase(paypalGateway, paymentRepository);
const captureOrderUseCase: CaptureOrderUseCase = new CaptureOrderUseCase(paypalGateway);

export const createOrderController: CreateOrderController = new CreateOrderController(createOrderUseCase);
export const captureOrderController: CaptureOrderController = new CaptureOrderController(captureOrderUseCase);