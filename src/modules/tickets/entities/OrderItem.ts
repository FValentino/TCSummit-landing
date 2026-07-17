import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./Order";
import { TicketType } from "./TicketType";

@Entity("order_items")
export class OrderItem {
  @PrimaryColumn("uuid", { type: "uuid" })
  id!: string;

  @Column({ type: "uuid" })
  orderId!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderId" })
  order!: Order;

  @Column({ type: "uuid" })
  ticketTypeId!: string;

  @ManyToOne(() => TicketType, (ticketType) => ticketType.orderItems, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "ticketTypeId" })
  ticketType!: TicketType;

  @Column({ type: "int" })
  quantity!: number;

  // Precio en centavos al momento de la compra
  @Column({ type: "int" })
  unitPrice!: number;
}
