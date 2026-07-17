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
import { OrderItem } from "./OrderItem";
import { Ticket } from "./Ticket";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

@Entity("orders")
export class Order {
  @PrimaryColumn("uuid", { type: "uuid" })
  id!: string;

  @Column({ type: "uuid" })
  eventId!: string;

  @ManyToOne(() => Event, (event) => event.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "eventId" })
  event!: Event;

  // Datos del comprador (se completan al registrar propietarios)
  @Column()
  buyerName!: string;

  @Column()
  buyerEmail!: string;

  @Column({ type: "int" })
  totalEntries!: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  // Relaciones
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items!: OrderItem[];

  @OneToMany(() => Ticket, (ticket) => ticket.order)
  tickets!: Ticket[];
}
