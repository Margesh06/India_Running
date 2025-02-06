import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRegistrationsTable1738830033405 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "registrations",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "event_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "reg_date",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "payment_status",
                        type: "enum",
                        enum: ["PENDING", "COMPLETED", "FAILED"],
                        default: "'PENDING'",
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("registrations");
    }
}
