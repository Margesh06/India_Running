import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeOrganiserTable1738561852013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add new columns, skipping email and phone_no
    await queryRunner.addColumns("Organiser", [
      new TableColumn({
        name: "fname",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "lname",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "org_name",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "address",
        type: "text",
        isNullable: true,
      }),
      new TableColumn({
        name: "city",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "state",
        type: "varchar",
        isNullable: true,
      }),
      new TableColumn({
        name: "pincode",
        type: "text",
        isNullable: true,
      }),
      new TableColumn({
        name: "pan_card",
        type: "text",
        isNullable: true,
      }),
    ]);

    // Split existing name into fname and lname
    await queryRunner.query(`
      UPDATE "Organiser"
      SET 
        "fname" = SPLIT_PART("name", ' ', 1),
        "lname" = SUBSTRING("name" FROM POSITION(' ' IN "name") + 1),
        "org_name" = "name"
    `);

    // Handle NULL values in columns before setting NOT NULL
    await queryRunner.query(`
      UPDATE "Organiser"
      SET 
        "address" = COALESCE("address", 'Unknown Address'),
        "city" = COALESCE("city", 'Unknown City'),
        "state" = COALESCE("state", 'Unknown State'),
        "pincode" = COALESCE("pincode", '000000'),
        "pan_card" = COALESCE("pan_card", 'Unknown')
    `);

    // Make columns non-nullable after data migration
    await queryRunner.query(`
      ALTER TABLE "Organiser" 
      ALTER COLUMN "fname" SET NOT NULL,
      ALTER COLUMN "lname" SET NOT NULL,
      ALTER COLUMN "org_name" SET NOT NULL,
      ALTER COLUMN "address" SET NOT NULL,
      ALTER COLUMN "city" SET NOT NULL,
      ALTER COLUMN "state" SET NOT NULL,
      ALTER COLUMN "pincode" SET NOT NULL,
      ALTER COLUMN "pan_card" SET NOT NULL
    `);

    // Drop the old name column
    await queryRunner.dropColumn("Organiser", "name");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add back the name column
    await queryRunner.addColumn(
      "Organiser",
      new TableColumn({
        name: "name",
        type: "varchar",
        isNullable: true,
      }),
    );

    // Combine fname and lname back into name
    await queryRunner.query(`
      UPDATE "Organiser"
      SET "name" = CONCAT("fname", ' ', "lname")
    `);

    // Make name non-nullable
    await queryRunner.query(`
      ALTER TABLE "Organiser" 
      ALTER COLUMN "name" SET NOT NULL
    `);

    // Remove new columns
    await queryRunner.dropColumns("Organiser", [
      "fname",
      "lname",
      "org_name",
      "address",
      "city",
      "state",
      "pincode",
      "pan_card",
    ]);
  }
}
