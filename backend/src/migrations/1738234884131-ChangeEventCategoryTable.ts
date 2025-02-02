import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEventCategoryTable1738234884131 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ensure the sequence exists before setting it as default
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS event_categories_id_seq;
            ALTER TABLE "event_categories" 
            ALTER COLUMN "id" SET DEFAULT nextval('event_categories_id_seq');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the changes
        await queryRunner.query(`
            ALTER TABLE "event_categories" 
            ALTER COLUMN "id" DROP DEFAULT;
            DROP SEQUENCE IF EXISTS event_categories_id_seq;
        `);
    }
}