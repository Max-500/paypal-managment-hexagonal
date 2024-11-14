import { CaptureOrderUseCase } from "../application/captureOrderUseCase";
import { CreateOrderUseCase } from "../application/createOrderUseCase";
import { CaptureOrderController } from "./controllers/captureOrderController";
import { CreateOrderController } from "./controllers/createOrderController";
import { PaypalMySQLRepository } from "./repositories/paypalMySQLRepository";

const paypalMySQLRepository: PaypalMySQLRepository = new PaypalMySQLRepository();

const currentRepository = paypalMySQLRepository;

const createOrderUseCase: CreateOrderUseCase = new CreateOrderUseCase(currentRepository);
const captureOrderUseCase: CaptureOrderUseCase = new CaptureOrderUseCase(currentRepository);

export const createOrderController: CreateOrderController = new CreateOrderController(createOrderUseCase);
export const captureOrderController: CaptureOrderController = new CaptureOrderController(captureOrderUseCase);