import { PaymentsGateway } from "../domain/ports/paymentGateway";

export class CaptureOrderUseCase {
    constructor(readonly repository: PaymentsGateway){}

    async execute(id: string) {
        return await this.repository.captureOrder(id);
    }
}