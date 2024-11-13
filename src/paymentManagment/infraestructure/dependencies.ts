import { CreateOrderUseCase } from "../application/createOrderUseCase";
import { CreateOrderController } from "./controllers/createOrderController";
import { PaypalMySQLRepository } from "./repositories/paypalMySQLRepository";

const paypalMySQLRepository: PaypalMySQLRepository = new PaypalMySQLRepository();

const currentRepository = paypalMySQLRepository;

const createOrderUseCase: CreateOrderUseCase = new CreateOrderUseCase(currentRepository);

export const createOrderController: CreateOrderController = new CreateOrderController(createOrderUseCase);