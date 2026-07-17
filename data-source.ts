import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";

// Cargar .env para la CLI de TypeORM
config();

/**
 * DataSource para comandos CLI de TypeORM.
 *
 * Uso:
 *   npx typeorm migration:generate src/migrations/Initial -d data-source.ts
 *   npx typeorm migration:run -d data-source.ts
 *   npx typeorm migration:revert -d data-source.ts
 *
 * NOTA: Este archivo NO se importa en la app.
 * La app usa src/shared/lib/db.ts que carga env.ts con validación Zod.
 * Este archivo carga .env directamente para que la CLI funcione sin
 * necesitar que la app esté corriendo.
 */
const cliDataSourceOptions: DataSourceOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["src/modules/**/entities/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  synchronize: false,
  logging: true,
};

export default new DataSource(cliDataSourceOptions);
