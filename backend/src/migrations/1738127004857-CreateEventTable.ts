import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from "typeorm";

export class CreateEventTableb1738056364532 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the event table
        await queryRunner.createTable(
            new Table({
                name: "event",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "text",
                    },
                    {
                        name: "venue",
                        type: "text",
                    },
                    {
                        name: "image",
                        type: "text",
                    },
                    {
                        name: "organiser_id",
                        type: "int",
                    },
                    {
                        name: "event_type",
                        type: "enum",
                        enum: ["OnGround", "Virtual", "OnGround+Virtual"],
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                    },
                    {
                        name: "country",
                        type: "varchar",
                    },
                    {
                        name: "state",
                        type: "varchar",
                    },
                    {
                        name: "city",
                        type: "varchar",
                    },
                    {
                        name: "pincode",
                        type: "varchar",
                    },
                    {
                        name: "banner_image",
                        type: "text",
                    },
                ],
            })
        );

        // Add foreign key for organiser_id
        await queryRunner.createForeignKey(
            "event",
            new TableForeignKey({
                columnNames: ["organiser_id"],
                referencedTableName: "Organiser",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key
        await queryRunner.dropForeignKey("event", "FK_event_organizer");

        // Drop the event table
        await queryRunner.dropTable("event");
    }
}
