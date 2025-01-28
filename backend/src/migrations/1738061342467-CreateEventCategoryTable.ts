import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateEventCategoryTable1738061342467 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the event_categories table
        await queryRunner.createTable(
            new Table({
                name: "event_categories",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "event_id",
                        type: "integer", // Ensure this matches the event table's id type
                    },
                    {
                        name: "category_id",
                        type: "integer", // Ensure this matches the category table's id type
                    },
                ],
            }),
        );

        // Add foreign key for event_id
        await queryRunner.createForeignKey(
            "event_categories",
            new TableForeignKey({
                columnNames: ["event_id"],
                referencedTableName: "event",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        );

        // Add foreign key for category_id
        await queryRunner.createForeignKey(
            "event_categories",
            new TableForeignKey({
                columnNames: ["category_id"],
                referencedTableName: "category",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        await queryRunner.dropForeignKey("event_categories", "FK_event_category_event");
        await queryRunner.dropForeignKey("event_categories", "FK_event_category_category");

        // Drop the event_categories table
        await queryRunner.dropTable("event_categories");
    }
}
