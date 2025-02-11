import { MigrationInterface, QueryRunner } from "typeorm";

export class ParticipantTableUpdate1739190321229 implements MigrationInterface {
    name = 'ParticipantTableUpdate1739190321229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "participants" DROP COLUMN "phone"')
        await queryRunner.query('ALTER TABLE "participants" ADD "phone" bigint NOT NULL' )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
