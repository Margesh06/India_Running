import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class ChangeReferrenceTableOfEventTable1739162380532 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the existing foreign key
        await queryRunner.dropForeignKey("event", "FK_56e3ec01a6f81d90e07444c937e");

        // Create a new foreign key referencing 'organisers'
        await queryRunner.createForeignKey(
            "event",
            new TableForeignKey({
                columnNames: ["organiser_id"],
                referencedTableName: "organisers", // Updated reference
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the updated foreign key
        await queryRunner.dropForeignKey("event", "FK_56e3ec01a6f81d90e07444c937e");

        // Recreate the original foreign key referencing 'Organiser'
        await queryRunner.createForeignKey(
            "event",
            new TableForeignKey({
                columnNames: ["organiser_id"],
                referencedTableName: "Organiser", // Revert reference
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }
}
