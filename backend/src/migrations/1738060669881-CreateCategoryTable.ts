import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoryTable1738059235068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the 'category' table
        await queryRunner.createTable(new Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'price',
                    type: 'decimal',
                    isNullable: false,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the 'category' table if the migration is rolled back
        await queryRunner.dropTable('category');
    }
}