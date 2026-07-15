import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Event } from "./Event";
import { Ticket } from "./Ticket";
import { OrderItem } from "./OrderItem";

export enum TicketTypeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SOLD_OUT = "sold_out",
  EXPIRED = "expired",
}

@Entity("ticket_types")
export class TicketType {
  @PrimaryColumn("uuid", { type: "uuid" })
  id!: string;

  @Column({ type: "uuid" })
  eventId!: string;

  @ManyToOne(() => Event, (event) => event.ticketTypes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "eventId" })
  event!: Event;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  // Lote de agrupación
  @Column()
  batch!: string;

  // Precio en centavos (ej: 1000 = $10.00 USD)
  @Column({ type: "int" })
  price!: number;

  @Column({ length: 3, default: "USD" })
  currency!: string;

  // Capacidad
  @Column({ type: "int" })
  totalCapacity!: number;

  @Column({ type: "int", default: 0 })
  soldCount!: number;

  @Column({ type: "int", default: 2 })
  maxPerOrder!: number;

  // Perks (JSON array)
  @Column({ type: "simple-json", default: "[]" })
  perks!: string[];

  // Ventana de venta
  @Column({ type: "timestamptz", nullable: true })
  saleStartDate!: Date | null;

  @Column({ type: "timestamptz", nullable: true })
  saleEndDate!: Date | null;

  @Column({ type: "int", nullable: true })
  saleMaxQuantity!: number | null;

  // Estado
  @Column({
    type: "enum",
    enum: TicketTypeStatus,
    default: TicketTypeStatus.ACTIVE,
  })
  status!: TicketTypeStatus;

  @Column({ type: "int", default: 0 })
  displayOrder!: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  // Relaciones
  @OneToMany(() => Ticket, (ticket) => ticket.ticketType)
  tickets!: Ticket[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.ticketType)
  orderItems!: OrderItem[];
}
