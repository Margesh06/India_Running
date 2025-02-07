import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrganiser1738924991973 implements MigrationInterface {
    name = 'UpdateOrganiser1738924991973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisers" DROP CONSTRAINT IF EXISTS "FK_e12e64a2346d3b69db721f2dcac"`);

        await queryRunner.query(`ALTER TABLE "organisers" DROP COLUMN IF EXISTS "user_id"`);

        await queryRunner.query(`ALTER TABLE "organisers" ALTER COLUMN "fname" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organisers" ALTER COLUMN "lname" SET NOT NULL`);

        await queryRunner.query(`ALTER TABLE "organisers" DROP COLUMN IF EXISTS "phone_no"`);
        await queryRunner.query(`ALTER TABLE "organisers" ADD "phone_no" character varying(10)`);

        await queryRunner.query(`ALTER TABLE "organisers" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organisers" ADD CONSTRAINT "UQ_6bc7af446ed21fd81d28523ef09" UNIQUE ("email")`);

        await queryRunner.query(`ALTER TABLE "organisers" ADD COLUMN IF NOT EXISTS "pincode" character varying(6)`);

        await queryRunner.query(`ALTER TABLE "organisers" ADD CONSTRAINT "UQ_5fd4213dccfc8e6c3d86ab0826d" UNIQUE ("pan_card")`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisers" DROP CONSTRAINT IF EXISTS "UQ_5fd4213dccfc8e6c3d86ab0826d"`);

        await queryRunner.query(`ALTER TABLE "organisers" DROP COLUMN IF EXISTS "pincode"`);

        await queryRunner.query(`ALTER TABLE "organisers" DROP CONSTRAINT IF EXISTS "UQ_6bc7af446ed21fd81d28523ef09"`);
        await queryRunner.query(`ALTER TABLE "organisers" ALTER COLUMN "email" DROP NOT NULL`);

        await queryRunner.query(`ALTER TABLE "organisers" DROP COLUMN IF EXISTS "phone_no"`);
        await queryRunner.query(`ALTER TABLE "organisers" ADD "phone_no" integer`);

        await queryRunner.query(`ALTER TABLE "organisers" ALTER COLUMN "fname" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "organisers" ALTER COLUMN "lname" DROP NOT NULL`);

        await queryRunner.query(`ALTER TABLE "organisers" ADD COLUMN IF NOT EXISTS "user_id" integer`);

        await queryRunner.query(`
            ALTER TABLE "organisers" ADD CONSTRAINT "FK_e12e64a2346d3b69db721f2dcac"
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
