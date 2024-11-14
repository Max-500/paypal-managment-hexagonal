import { Request, RequestHandler, Response } from "express";
import { CaptureOrderUseCase } from "../../application/captureOrderUseCase";
import { HttpError } from "../errors/error";

export class CaptureOrderController {
    constructor(readonly useCase: CaptureOrderUseCase) {}

    execute: RequestHandler = async(req: Request, res: Response) => {
        try {
            const { orderID } = req.body;
            if(orderID == undefined) {
                res.status(400).json({ message: "No se esta enviando el id de la orden" });
                return;
            }

            const response = await this.useCase.execute(orderID);
            res.status(201).json({ data: response, message: "Orden Capturada Correctamente" });
            return;
        } catch (error) {
            if (error instanceof HttpError) {
                res.status(error.httpStatus).json({ error: error.message });
                return;
            }

            console.error("Error inesperado:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

}