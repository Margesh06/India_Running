import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1738749479750 implements MigrationInterface {
    name = 'AddUserRole1738749479750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
