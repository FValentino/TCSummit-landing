import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { TicketType } from "./TicketType";
import { Order } from "./Order";

export enum TicketStatus {
  ACTIVE = "active",
  USED = "used",
  CANCELLED = "cancelled",
  TRANSFERRED = "transferred",
}

@Entity("tickets")
export class Ticket {
  @PrimaryColumn("uuid", { type: "uuid" })
  id!: string;

  @Column({ type: "uuid" })
  ticketTypeId!: string;

  @ManyToOne(() => TicketType, (ticketType) => ticketType.tickets, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ticketTypeId" })
  ticketType!: TicketType;

  @Column({ type: "uuid" })
  orderId!: string;

  @ManyToOne(() => Order, (order) => order.tickets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderId" })
  order!: Order;

  // Datos del propietario
  @Column()
  ownerName!: string;

  @Column()
  ownerEmail!: string;

  // ─── Campos NFT (reservados para futuro) ───
  @Column({ type: "varchar", nullable: true })
  nftTokenId!: string | null;

  @Column({ type: "varchar", nullable: true })
  nftContractAddress!: string | null;

  @Column({ type: "varchar", nullable: true })
  nftMetadataUri!: string | null;

  // ─── Datos de la entrada ───
  @Column({ type: "varchar", length: 500, unique: true })
  qrCode!: string;

  @Column({ type: "simple-json", default: "{}" })
  metadata!: Record<string, unknown>;

  @Column({
    type: "enum",
    enum: TicketStatus,
    default: TicketStatus.ACTIVE,
  })
  status!: TicketStatus;

  @Column({ type: "timestamptz", nullable: true })
  usedAt!: Date | null;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt!: Date;
}
