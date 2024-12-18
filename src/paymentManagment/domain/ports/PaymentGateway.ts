import { CapturedPayment } from "../entities/CapturedPayment";
import { CreateOrderData } from "../entities/CreateOrderData";
import { PaymentOrder } from "../entities/PaymentOrder";

export interface PaymentsGateway {
    createOrder(order: CreateOrderData): Promise<PaymentOrder>;
    captureOrder(id: String): Promise<CapturedPayment>;
}