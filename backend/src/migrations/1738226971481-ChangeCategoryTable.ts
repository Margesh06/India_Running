import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeCategoryTable1738226971481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("category", [
      new TableColumn({
        name: "additionalInfo",
        type: "text",
        isNullable: true,
      }),
      new TableColumn({
        name: "ageLimitMin",
        type: "int",
        isNullable: true,
      }),
      new TableColumn({
        name: "ageLimitMax",
        type: "int",
        isNullable: true,
      }),
      new TableColumn({
        name: "inclusive",
        type: "enum",
        enum: [
          "Timing Chip",
          "Goodie Bag",
          "E-Certificate",
          "Refreshments",
          "Bib",
          "Timed Bib",
          "Medals",
          "Tshirt",
        ],
        isArray: true,
        default: "'{}'",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("category", "additionalInfo");
    await queryRunner.dropColumn("category", "ageLimitMin");
    await queryRunner.dropColumn("category", "ageLimitMax");
    await queryRunner.dropColumn("category", "inclusive");
  }
}
