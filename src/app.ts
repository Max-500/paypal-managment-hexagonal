import express, { Application } from "express";
import morgan from "morgan";
import "reflect-metadata";
import { paymentRouter } from "./paymentManagment/infrastructure/routes/paymentRoutes";
import { AppDataSource } from "./paymentManagment/infrastructure/database/data-source";

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/payments', paymentRouter);

process.loadEnvFile();
const PORT = process.env.PORT || 3000;
  
app.listen(PORT, async () => {
    await AppDataSource.initialize();
    console.log('DATABASE RUNNING CORRECTLY');
    console.log(`SERVER RUNNING IN http://localhost:${PORT}.`);
});