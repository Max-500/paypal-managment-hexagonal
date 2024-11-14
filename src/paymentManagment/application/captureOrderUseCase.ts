import { PaymentsRepository } from "../domain/repositories/paymentRepository";

export class CaptureOrderUseCase {
    constructor(readonly repository: PaymentsRepository){}

    async execute(id: string) {
        return await this.repository.captureOrder(id);
    }
}