import express, { Application } from "express";
import morgan from "morgan";
import axios from "axios";
import { paymentRouter } from "./paymentManagment/infraestructure/routes/paymentRoutes";

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/', paymentRouter);

const CLIENT_ID = 'AVC7W0kZ-GPs-48gPz8ZgATy93WDOaNl8Gd-Z7fx-kKnwpYx_DupMHShQs1dZd3QIxPeIsowzqnF191S';
const SECRET = 'EKoyGM3pRjEHcju3CLRfPVcf-6p4mdrAi2vVLMbIyzH1wdDiCUJP3R-uRXY77LjI4l0WBr0xzRCeRk8y';
const BASE_URL = 'https://api-m.sandbox.paypal.com';

process.loadEnvFile();
const PORT = process.env.PORT || 3000;
  

  app.post('/capture-order', async (req, res) => {
    const { orderID } = req.body; // Asegúrate de pasar el ID de la orden aprobada
  
    try {
      // Paso 1: Obtener Access Token
      const tokenResponse = await axios.post(
        `${BASE_URL}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          auth: {
            username: CLIENT_ID,
            password: SECRET,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      const accessToken = tokenResponse.data.access_token;
  
      // Paso 2: Capturar la orden
      const captureResponse = await axios.post(
        `${BASE_URL}/v2/checkout/orders/${orderID}/capture`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Devolver detalles de la captura
      res.status(200).json(captureResponse.data);
    } catch (error: any) {
      console.error('Error al capturar la orden:', error.response.data);
      res.status(500).json({ error: error.response.data });
    }
  });
  

app.listen(PORT, () => console.log(`SERVER RUNNING IN http://localhost:${PORT}.`));