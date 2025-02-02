import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrganiserTable1738052989971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Organiser", 
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
                        name: "phone_no",
                        type: "bigint", 
                    },
                    {
                        name: "email",
                        type: "varchar", 
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("organizers");
    }

}