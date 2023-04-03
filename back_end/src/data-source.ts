import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const setDataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}");
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath],
        };
    }

    return {
        type: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: true,
        synchronize: false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
};

export const AppDataSource = new DataSource(setDataSourceConfig());
