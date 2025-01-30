import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEventCategoryTableSerialIssue1738235387260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Manually synchronize the sequence with the highest id in the event_categories table
        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM event_categories) THEN
                    -- If records exist, set sequence to the highest id
                    PERFORM setval('event_categories_id_seq', (SELECT MAX(id) FROM event_categories));
                ELSE
                    -- If no records exist, set sequence to 1
                    PERFORM setval('event_categories_id_seq', 1);
                END IF;
            END;
            $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // No changes to revert for this operation
    }
}
