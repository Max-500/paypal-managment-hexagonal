import { Repository } from "typeorm";
import { PaymentRepository } from "../../domain/ports/paymentRepository";
import { Order } from "../database/models/Order";

export class PaymentMySQLRepository implements PaymentRepository {
    constructor(private readonly repository: Repository<Order>) {}

    async saveOrder(_order: { id: string; amount: number; currencyCode: string; }): Promise<void> {
        const order = this.repository.create(_order);
        await this.repository.save(order);
    }

    async savePrmiumSucription(suscrption: { id: string; userId: string; orderId: string; }): Promise<void> {
        throw new Error("Method not implemented.");
    }

}