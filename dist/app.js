"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const axios_1 = __importDefault(require("axios"));
const paymentRoutes_1 = require("./paymentManagment/infraestructure/routes/paymentRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/', paymentRoutes_1.paymentRouter);
const CLIENT_ID = 'AVC7W0kZ-GPs-48gPz8ZgATy93WDOaNl8Gd-Z7fx-kKnwpYx_DupMHShQs1dZd3QIxPeIsowzqnF191S';
const SECRET = 'EKoyGM3pRjEHcju3CLRfPVcf-6p4mdrAi2vVLMbIyzH1wdDiCUJP3R-uRXY77LjI4l0WBr0xzRCeRk8y';
const BASE_URL = 'https://api-m.sandbox.paypal.com';
process.loadEnvFile();
const PORT = process.env.PORT || 3000;
app.post('/capture-order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderID } = req.body; // Asegúrate de pasar el ID de la orden aprobada
    try {
        // Paso 1: Obtener Access Token
        const tokenResponse = yield axios_1.default.post(`${BASE_URL}/v1/oauth2/token`, 'grant_type=client_credentials', {
            auth: {
                username: CLIENT_ID,
                password: SECRET,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const accessToken = tokenResponse.data.access_token;
        // Paso 2: Capturar la orden
        const captureResponse = yield axios_1.default.post(`${BASE_URL}/v2/checkout/orders/${orderID}/capture`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        // Devolver detalles de la captura
        res.status(200).json(captureResponse.data);
    }
    catch (error) {
        console.error('Error al capturar la orden:', error.response.data);
        res.status(500).json({ error: error.response.data });
    }
}));
app.listen(PORT, () => console.log(`SERVER RUNNING IN http://localhost:${PORT}.`));
