import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "@/config/env";
import "@/modules/tickets/entities"; // Registra entidades para que TypeORM las descubra

/**
 * Configuración del DataSource de TypeORM.
 * Usado por la app y por la CLI de TypeORM (migraciones, etc.)
 */
const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: env.DATABASE_URL,
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false, // Nunca auto-crear tablas en prod — usar migraciones
  logging: process.env.NODE_ENV === "development",
};

/**
 * DataSource principal de la app.
 * Importar y usar para queries:
 *
 *   import { AppDataSource } from "@/lib/db";
 *   const users = await AppDataSource.getRepository(User).find();
 */
export const AppDataSource = new DataSource(dataSourceOptions);
