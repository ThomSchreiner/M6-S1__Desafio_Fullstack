import { DataSource } from "typeorm";
import path from "path";
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: false,
    entities: [path.join(__dirname, "./entities/**.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**.{js,ts}")],
});
