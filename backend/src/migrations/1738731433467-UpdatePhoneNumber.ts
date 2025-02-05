import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePhoneNumber1738731433467 implements MigrationInterface {
    name = 'UpdatePhoneNumber1738731433467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "phone_no"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "phone_no" bigint`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "user_id" DROP NOT NULL`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_eee360f3bff24af1b6890765201"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP COLUMN "phone_no"`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD "phone_no" integer`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_eee360f3bff24af1b6890765201" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
