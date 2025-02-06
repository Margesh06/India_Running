import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateParticipantsTable1738828087859 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "participants",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "event_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "bib_no",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "reg_date",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "emergency_no",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "emergency_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "height",
                        type: "decimal",
                        precision: 5,
                        scale: 2,
                        isNullable: true, // Optional
                    },
                    {
                        name: "weight",
                        type: "decimal",
                        precision: 5,
                        scale: 2,
                        isNullable: true, // Optional
                    },
                    {
                        name: "tshirt_size",
                        type: "enum",
                        enum: ["XS", "S", "M", "L", "XL", "XXL"],
                        isNullable: true, // Optional
                    },
                    {
                        name: "shoe_size",
                        type: "int",
                        isNullable: true, // Optional
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("participants");
    }
}
