import { CaptureOrderUseCase } from "../application/CaptureOrderUseCase";
import { CreateOrderUseCase } from "../application/CreateOrderUseCase";
import { IsUserSuscribedUseCase } from "../application/IsUserSuscribedUseCase";
import { CaptureOrderController } from "./controllers/CaptureOrderController";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { IsUserSuscribedController } from "./controllers/IsUserSuscribedController";
import { AppDataSource } from "./database/data-source";
import { Order } from "./database/models/Order";
import { PremiumSubscription } from "./database/models/PremiumSuscription";
import { PaymentMySQLRepository } from "./repositories/PaymentMySQLRepository";
import { PaypalGateway } from "./repositories/paypalGateway";

const paypalGateway: PaypalGateway = new PaypalGateway();

const orderRepository = AppDataSource.getRepository(Order);
const suscrptionRepository = AppDataSource.getRepository(PremiumSubscription);
const paymentRepository = new PaymentMySQLRepository(orderRepository, suscrptionRepository);

const createOrderUseCase: CreateOrderUseCase = new CreateOrderUseCase(paypalGateway, paymentRepository);
const captureOrderUseCase: CaptureOrderUseCase = new CaptureOrderUseCase(paypalGateway, paymentRepository);
const isUserSuscribedUseCase: IsUserSuscribedUseCase = new IsUserSuscribedUseCase(paymentRepository);

export const createOrderController: CreateOrderController = new CreateOrderController(createOrderUseCase);
export const captureOrderController: CaptureOrderController = new CaptureOrderController(captureOrderUseCase);
export const isUserSuscribedController: IsUserSuscribedController = new IsUserSuscribedController(isUserSuscribedUseCase);