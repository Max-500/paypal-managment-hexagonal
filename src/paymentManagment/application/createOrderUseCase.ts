import { CreateOrderData } from "../domain/entities/CreateOrderData";
import { PaymentOrder } from "../domain/entities/PaymentOrder";
import { PaymentsGateway } from "../domain/ports/paymentGateway";
import { Validator } from "../domain/validator/validator";

export class CreateOrderUseCase {
    constructor(readonly repository: PaymentsGateway){}

    async execute(amount: number, currencyCode: string): Promise<PaymentOrder>  {
        const orderData = new CreateOrderData(amount, currencyCode);
        const validator = new Validator(orderData);
        await validator.validate();

        return await this.repository.createOrder(orderData);
    }
}