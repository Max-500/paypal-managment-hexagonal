import { CapturedPayment } from "../entities/capturedPayment";
import { CreateOrderData } from "../entities/createOrderData";
import { PaymentOrder } from "../entities/paymentOrder";

export interface PaymentsRepository {
    createOrder(order: CreateOrderData): Promise<PaymentOrder>;
    captureOrder(id: String): Promise<CapturedPayment>;
}