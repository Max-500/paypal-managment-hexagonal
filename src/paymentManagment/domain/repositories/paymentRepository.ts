import { CreateOrderData } from "../entities/createOrderData";
import { PaymentOrder } from "../entities/paymentOrder";

export interface PaymentsRepository {
    createOrder(order: CreateOrderData): Promise<PaymentOrder>;
}