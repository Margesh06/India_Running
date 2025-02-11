import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ChangeParticipantTable1739188876247 implements MigrationInterface {
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
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "bib_no",
            type: "varchar",
          },
          {
            name: "reg_date",
            type: "bigint",
          },
          {
            name: "emergency_no",
            type: "int",
          },
          {
            name: "emergency_name",
            type: "varchar",
          },
          {
            name: "height",
            type: "decimal",
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: "weight",
            type: "decimal",
            precision: 5,
            scale: 2,
            isNullable: true,
          },
          {
            name: "tshirt_size",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "shoe_size",
            type: "int",
            isNullable: true,
          },
          {
            name: "first_name",
            type: "varchar",
          },
          {
            name: "last_name",
            type: "varchar",
          },
          {
            name: "date_of_birth",
            type: "date",
            isNullable: true,
          },
          {
            name: "gender",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "phone",
            type: "bigint",
            isNullable: true,
          },
          {
            name: "address",
            type: "text",
            isNullable: true,
          },
          {
            name: "pincode",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "blood_group",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "emergency_contact_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "emergency_contact_number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "terms_and_condition",
            type: "boolean",
            default: false,
          },
          {
            name: "medical_condition",
            type: "text",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("participants");
  }
}

