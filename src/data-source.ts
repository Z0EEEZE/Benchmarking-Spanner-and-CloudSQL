import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entity/product";
import { Order } from "./entity/order";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "latency-db",
    synchronize: false, // We already created tables
    logging: true,
    entities: [Product, Order],
    migrations: [],
    subscribers: [],
});
