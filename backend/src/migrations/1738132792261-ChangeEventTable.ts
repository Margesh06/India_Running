import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterEventTableMigration1738061349999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Rename `image` column to `gallery_images` and convert it to an array
        await queryRunner.renameColumn("event", "image", "gallery_images");
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "gallery_images" TYPE text[] USING ARRAY[gallery_images]`);

        // Add `activity_type` enum column
        await queryRunner.addColumn(
            "event",
            new TableColumn({
                name: "activity_type",
                type: "enum",
                enum: ["Running", "Walking", "Cycling"],
                isNullable: false,
            }),
        );

        // Add `reg_close_date` column
        await queryRunner.addColumn(
            "event",
            new TableColumn({
                name: "reg_close_date",
                type: "timestamp",
                isNullable: true,
            }),
        );

        // Add `area` column
        await queryRunner.addColumn(
            "event",
            new TableColumn({
                name: "area",
                type: "text",
                isNullable: false,
            }),
        );

        // Add `mobile_banner` column
        await queryRunner.addColumn(
            "event",
            new TableColumn({
                name: "mobile_banner",
                type: "text",
                isNullable: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert `gallery_images` back to `image`
        await queryRunner.renameColumn("event", "gallery_images", "image");
        await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "image" TYPE text`);

        // Drop `activity_type`, `reg_close_date`, `area`, and `mobile_banner`
        await queryRunner.dropColumn("event", "activity_type");
        await queryRunner.dropColumn("event", "reg_close_date");
        await queryRunner.dropColumn("event", "area");
        await queryRunner.dropColumn("event", "mobile_banner");
    }
}
