import { DataSource } from "typeorm";

process.loadEnvFile();
export const AppDataSource = new DataSource({
  type:  process.env.DB_DIALECT as "mysql" || "sqlite" || "mariadb" || "mongodb" || "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + "/models/**/*.ts"],
  migrations: [__dirname + "/migrations/**/*.ts"],
  synchronize: false,
  logging: true,
});