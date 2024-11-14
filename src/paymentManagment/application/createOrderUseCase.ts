import { CreateOrderData } from "../domain/entities/CreateOrderData";
import { PaymentOrder } from "../domain/entities/PaymentOrder";
import { PaymentsRepository } from "../domain/repositories/paymentRepository";
import { Validator } from "../domain/validator/validator";

export class CreateOrderUseCase {
    constructor(readonly repository: PaymentsRepository){}

    async execute(amount: number, currencyCode: string, description?: string): Promise<PaymentOrder>  {
        const orderData = new CreateOrderData(amount, currencyCode, description);
        const validator = new Validator(orderData);
        await validator.validate();

        return await this.repository.createOrder(orderData);
    }
}