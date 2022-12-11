import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccount1670779426476 implements MigrationInterface {
  name = 'CreateAccount1670779426476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS account;
              
      CREATE TABLE "account"."account" (
        "account_id" SERIAL NOT NULL, 
        "first_name" character varying NOT NULL, 
        "last_name" character varying NOT NULL, 
        "balance" double precision NOT NULL, 
        "created_at" date NOT NULL, 
        "updated_at" date NOT NULL, 
        CONSTRAINT "PK_ea08b54a9d7322975ffc57fc612" PRIMARY KEY ("account_id")
      );
        
      CREATE TABLE "account"."transaction" (
        "transaction_id" SERIAL NOT NULL, 
        "amount" numeric NOT NULL, 
        "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
        "accountSourceAccountId" integer, 
        "accountTargetAccountId" integer, 
        CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id"));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "account"."account";
      DROP TABLE "account"."transaction";
      DROP SCHEMA IF EXISTS account;
    `);
  }
}
