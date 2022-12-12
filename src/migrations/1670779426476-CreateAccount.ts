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
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        CONSTRAINT "PK_ea08b54a9d7322975ffc57fc612" PRIMARY KEY ("account_id")
      );
      
      COMMENT ON TABLE "account"."account" IS 'Base account info';
      COMMENT ON COLUMN "account"."account"."account_id" IS 'Primary key for table';
      COMMENT ON COLUMN "account"."account"."first_name" IS 'Account name';
      COMMENT ON COLUMN "account"."account"."last_name" IS 'Account last name';
      COMMENT ON COLUMN "account"."account"."balance" IS 'Actual account balance';
      COMMENT ON COLUMN "account"."account"."created_ad" IS 'Datettime account was created';
      COMMENT ON COLUMN "account"."account"."updated_at" IS 'Datetime last update';
        
        
      CREATE TABLE "account"."transaction" (
        "transaction_id" SERIAL NOT NULL, 
        "amount" numeric NOT NULL, 
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), 
        "account_id_from" integer, 
        "account_id_from" integer, 
        CONSTRAINT "PK_6e02e5a0a6a7400e1c944d1e946" PRIMARY KEY ("transaction_id"));
        
      COMMENT ON TABLE "account"."transaction" IS 'Transactions between accounts';
      COMMENT ON COLUMN "account"."transaction"."transaction_id" IS 'Primary key for table';
      COMMENT ON COLUMN "account"."transaction"."created_at" IS 'Transactions created datetime';
      COMMENT ON COLUMN "account"."transaction"."account_id_from" IS 'Transfer from account';
      COMMENT ON COLUMN "account"."transaction"."account_id_to" IS 'Transfer to account';
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
