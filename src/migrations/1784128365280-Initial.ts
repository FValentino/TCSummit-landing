import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1784128365280 implements MigrationInterface {
    name = 'Initial1784128365280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_items" ("id" uuid NOT NULL, "orderId" uuid NOT NULL, "ticketTypeId" uuid NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'confirmed', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL, "eventId" uuid NOT NULL, "buyerName" character varying NOT NULL, "buyerEmail" character varying NOT NULL, "totalEntries" integer NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('active', 'used', 'cancelled', 'transferred')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL, "ticketTypeId" uuid NOT NULL, "orderId" uuid NOT NULL, "ownerName" character varying NOT NULL, "ownerEmail" character varying NOT NULL, "nftTokenId" character varying, "nftContractAddress" character varying, "nftMetadataUri" character varying, "qrCode" character varying(500) NOT NULL, "metadata" text NOT NULL DEFAULT '{}', "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'active', "usedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_fededfa934cf8d7214adfa6c824" UNIQUE ("qrCode"), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ticket_types_status_enum" AS ENUM('active', 'inactive', 'sold_out', 'expired')`);
        await queryRunner.query(`CREATE TABLE "ticket_types" ("id" uuid NOT NULL, "eventId" uuid NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "batch" character varying NOT NULL, "price" integer NOT NULL, "currency" character varying(3) NOT NULL DEFAULT 'USD', "totalCapacity" integer NOT NULL, "soldCount" integer NOT NULL DEFAULT '0', "maxPerOrder" integer NOT NULL DEFAULT '2', "perks" text NOT NULL DEFAULT '[]', "saleStartDate" TIMESTAMP WITH TIME ZONE, "saleEndDate" TIMESTAMP WITH TIME ZONE, "saleMaxQuantity" integer, "status" "public"."ticket_types_status_enum" NOT NULL DEFAULT 'active', "displayOrder" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_ea52687c7dd02cc5bfc300821f3" UNIQUE ("slug"), CONSTRAINT "PK_5510ce7e18a4edc648c9fbfc283" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."events_status_enum" AS ENUM('draft', 'active', 'cancelled', 'completed')`);
        await queryRunner.query(`CREATE TABLE "events" ("id" uuid NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "venue" character varying NOT NULL, "address" character varying NOT NULL, "maxCapacity" integer NOT NULL, "status" "public"."events_status_enum" NOT NULL DEFAULT 'draft', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_05bd884c03d3f424e2204bd14cd" UNIQUE ("slug"), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "magic_links" ("id" uuid NOT NULL, "email" character varying NOT NULL, "tokenHash" character varying NOT NULL, "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "used" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6c609d48037f164e7ae5b744b18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_4670c8ee386fe17b0c21bdef404" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_80f390b083014fd69ec40b8c38c" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_9ff866ea2cad94fc6a8106e6909" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_types"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_e3e1e1e9d4ee34649da54a016e4" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_types" ADD CONSTRAINT "FK_0bf6c025aea56d71d7c0a019f9e" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_types" DROP CONSTRAINT "FK_0bf6c025aea56d71d7c0a019f9e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_e3e1e1e9d4ee34649da54a016e4"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_9ff866ea2cad94fc6a8106e6909"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_80f390b083014fd69ec40b8c38c"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_4670c8ee386fe17b0c21bdef404"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d"`);
        await queryRunner.query(`DROP TABLE "magic_links"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TYPE "public"."events_status_enum"`);
        await queryRunner.query(`DROP TABLE "ticket_types"`);
        await queryRunner.query(`DROP TYPE "public"."ticket_types_status_enum"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "order_items"`);
    }

}
