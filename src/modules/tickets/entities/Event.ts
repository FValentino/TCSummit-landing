import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { TicketType } from "./TicketType";
import { Order } from "./Order";

export enum EventStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

@Entity("events")
export class Event {
  @PrimaryColumn("uuid", { type: "uuid" })
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "timestamptz" })
  startDate!: Date;

  @Column({ type: "timestamptz" })
  endDate!: Date;

  @Column()
  venue!: string;

  @Column()
  address!: string;

  @Column({ type: "int" })
  maxCapacity!: number;

  @Column({
    type: "enum",
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status!: EventStatus;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;

  // Relaciones
  @OneToMany(() => TicketType, (ticketType) => ticketType.event)
  ticketTypes!: TicketType[];

  @OneToMany(() => Order, (order) => order.event)
  orders!: Order[];
}
