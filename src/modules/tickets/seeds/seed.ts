import "reflect-metadata";
import { config } from "dotenv";
config();

import { DataSource } from "typeorm";
import { uuidv7 } from "uuidv7";
import { Event, EventStatus } from "../entities/Event";
import {
  TicketType,
  TicketTypeStatus,
} from "../entities/TicketType";
import { Ticket } from "../entities/Ticket";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { MagicLink } from "../entities/MagicLink";

/**
 * Seed de desarrollo — TC Summit 2026
 *
 * Uso:
 *   TS_NODE_PROJECT=tsconfig.orm.json npx ts-node src/modules/tickets/seeds/seed.ts
 *
 * Idempotente: puede correrse múltiples veces sin duplicar datos.
 */

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Event, TicketType, Ticket, Order, OrderItem, MagicLink],
  synchronize: false,
  logging: false,
});

// IDs fijos para idempotencia (UUID v7 generados una vez)
const EVENT_ID = "01980c00-0000-7000-8000-000000000001";
const PROTOTYPE_TICKET_TYPE_ID =
  "01980c00-0000-7000-8000-000000000010";

async function seed() {
  await dataSource.initialize();
  console.log("📦 Conectado a la DB\n");

  const eventRepo = dataSource.getRepository(Event);
  const ticketTypeRepo = dataSource.getRepository(TicketType);

  // ─── Evento ───
  let event = await eventRepo.findOneBy({ id: EVENT_ID });

  if (!event) {
    event = eventRepo.create({
      id: EVENT_ID,
      name: "Techno Crypto Summit 2026",
      slug: "tc-summit-2026",
      description:
        "El evento presencial de tecnología y crypto más importante de Latinoamérica. 3 días de conferencias, talleres y networking en Buenos Aires.",
      startDate: new Date("2026-10-15T09:00:00-03:00"),
      endDate: new Date("2026-10-17T18:00:00-03:00"),
      venue: "Centro de Convenciones de Buenos Aires",
      address: "Av. San Martín 1250, Buenos Aires, Argentina",
      maxCapacity: 500,
      status: EventStatus.ACTIVE,
    });
    await eventRepo.save(event);
    console.log("✅ Evento creado: Techno Crypto Summit 2026");
  } else {
    console.log("⏭️  Evento ya existe, saltando...");
  }

  // ─── TicketType: Prototype ───
  let prototype = await ticketTypeRepo.findOneBy({
    id: PROTOTYPE_TICKET_TYPE_ID,
  });

  if (!prototype) {
    prototype = ticketTypeRepo.create({
      id: PROTOTYPE_TICKET_TYPE_ID,
      eventId: EVENT_ID,
      name: "Prototype",
      slug: "prototype",
      description:
        "Entrada de prueba para demostración. Permite crear entradas falsas sin restricciones de precio.",
      batch: "Lote 1 — Demo",
      price: 0,
      currency: "USD",
      totalCapacity: 999,
      soldCount: 0,
      maxPerOrder: 2,
      perks: ["Acceso general", "Entrada de demostración"],
      saleStartDate: new Date("2026-07-01T00:00:00-03:00"),
      saleEndDate: new Date("2026-12-31T23:59:59-03:00"),
      saleMaxQuantity: null,
      status: TicketTypeStatus.ACTIVE,
      displayOrder: 0,
    });
    await ticketTypeRepo.save(prototype);
    console.log("✅ TicketType creado: Prototype (gratis, capacidad 999)");
  } else {
    console.log("⏭️  TicketType Prototype ya existe, saltando...");
  }

  console.log("\n🎉 Seed completado");
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error("❌ Error en seed:", err);
  process.exit(1);
});
