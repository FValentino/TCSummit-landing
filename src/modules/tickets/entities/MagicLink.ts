import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("magic_links")
export class MagicLink {
  @PrimaryColumn("uuid", { type: "uuid" })
  id!: string;

  @Column()
  email!: string;

  // Hash SHA-256 del token (nunca se almacena el raw)
  @Column()
  tokenHash!: string;

  @Column({ type: "timestamptz" })
  expiresAt!: Date;

  @Column({ default: false })
  used!: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
