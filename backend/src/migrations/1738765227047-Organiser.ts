import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Organiser1738765227047 implements MigrationInterface {
    name = 'Organiser1738765227047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "organisers",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "fname",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "lname",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "phone_no",
                type: "int",
                isNullable: true,
              },
              {
                name: "org_name",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "email",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "address",
                type: "text",
                isNullable: true,
              },
              {
                name: "city",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "state",
                type: "varchar",
                isNullable: true,
              },
              {
                name: "pincode",
                type: "text",
                isNullable: true,
              },
              {
                name: "pan_card",
                type: "text",
                isNullable: true,
              },
              {
                name: "user_id",
                type: "int",
                isNullable: true,  
              },
            ],
            foreignKeys: [
                {
                  columnNames: ["user_id"],
                  referencedColumnNames: ["id"],
                  referencedTableName: "users",
                  onDelete: "CASCADE",
                },
              ],
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("organisers");
      }

}
