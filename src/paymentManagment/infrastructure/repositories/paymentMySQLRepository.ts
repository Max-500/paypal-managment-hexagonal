import { Repository } from "typeorm";
import { PaymentRepository } from "../../domain/ports/paymentRepository";
import { Order } from "../database/models/Order";
import { PremiumSubscription } from "../database/models/PremiumSuscription";

export class PaymentMySQLRepository implements PaymentRepository {
    constructor(private readonly repositoryOrder: Repository<Order>, private readonly repositorySuscription: Repository<PremiumSubscription>) {}

    

    async saveOrder(_order: { id: string, amount: number, currencyCode: string; }): Promise<void> {
        const order = this.repositoryOrder.create(_order);
        await this.repositoryOrder.save(order);
    }

    async savePrmiumSucription(suscrption: { id: string, userId: string, orderId: string, transactionId: string, startDate: Date, endDate: Date }): Promise<void> {
        const suscription = this.repositorySuscription.create(suscrption);
        await this.repositorySuscription.save(suscription);
    }

}