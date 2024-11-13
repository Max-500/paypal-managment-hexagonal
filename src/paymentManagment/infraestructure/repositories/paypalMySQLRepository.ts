import axios, { AxiosError } from "axios";
import { CreateOrderData } from "../../domain/entities/createOrderData";
import { PaymentOrder } from "../../domain/entities/paymentOrder";
import { PaymentsRepository } from "../../domain/repositories/paymentRepository";
import { HttpError } from "../errors/error";

process.loadEnvFile();

export class PaypalMySQLRepository implements PaymentsRepository {
    private readonly CLIENT_ID = process.env.CLIENT_ID || 'no-clientID';
    private readonly BASE_URL = process.env.BASE_URL || 'no-base-url';
    private readonly SECRET = process.env.SECRET || 'no-secret';

    private async getAccessToken(): Promise<string> {
        console.log(this.BASE_URL);
        const response = await axios({
            url: `${this.BASE_URL}/v1/oauth2/token`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: this.CLIENT_ID,
                password: this.SECRET,
            },
            data: 'grant_type=client_credentials',
        });
        return response.data.access_token;
    }

    async createOrder(order: CreateOrderData): Promise<PaymentOrder> {
        try {
            const token = await this.getAccessToken();
            const response = await axios({
                url: `${this.BASE_URL}/v2/checkout/orders`,
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                    intent: 'CAPTURE',
                    purchase_units: [
                      {
                        amount: {
                          currency_code: order.currencyCode.toString(),
                          value: order.amount.toString(),
                        },
                      },
                    ],
                  }),
            });
            const { id, status, links } = response.data;
            return new PaymentOrder(id, status, links);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                const status = axiosError.response?.status || 500;
                const message = axiosError.response?.data || axiosError.message;
                throw new HttpError(`PayPal API Error: ${message}`, status);
              }
          
            throw new HttpError("Error inesperado al crear la orden.", 500);
        }
    }

}
