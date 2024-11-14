import express, { Application } from "express";
import morgan from "morgan";
import axios from "axios";
import { paymentRouter } from "./paymentManagment/infraestructure/routes/paymentRoutes";

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/', paymentRouter);

process.loadEnvFile();
const PORT = process.env.PORT || 3000;
  
app.listen(PORT, () => console.log(`SERVER RUNNING IN http://localhost:${PORT}.`));