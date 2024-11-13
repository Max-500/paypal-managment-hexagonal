import { IsNotEmpty, IsNumber, Min, IsOptional, Length } from "class-validator";

export class CreateOrderData {
    @IsNotEmpty({ message: "El campo 'amount' es requerido" })
    @IsNumber({}, { message: "La cantidad debe ser un número válido" })
    @Min(0, { message: "La cantidad no puede ser negativa" })
    readonly amount: number;

    @IsNotEmpty({ message: "El campo 'currencyCode' es requerido" })
    @Length(3, 3, { message: "El código de moneda debe tener exactamente 3 caracteres" })
    readonly currencyCode: string;

    @IsOptional()
    @IsNotEmpty({ message: "La descripción no puede estar vacía si se proporciona" })
    readonly description?: string;

    constructor(amount: number, currencyCode: string, description?: string) {
        this.amount = amount;
        this.currencyCode = currencyCode.toUpperCase();
        this.description = description;
    }

    async validate() {
        return Promise.resolve();
    }
}