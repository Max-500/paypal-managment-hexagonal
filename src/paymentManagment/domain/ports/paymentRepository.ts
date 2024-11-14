export interface PaymentRepository {
    saveOrder(order: { id: string, amount: number, currencyCode: string }): Promise<void>;
    savePrmiumSucription(suscrption: { id: string, userId: string, orderId: string }): Promise<void>
}