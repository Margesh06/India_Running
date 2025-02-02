import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPasswdColumn1738343021459 implements MigrationInterface {
    name = 'AddPasswdColumn1738343021459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users', // Table name
            new TableColumn({
                name: 'password',
                type: 'varchar',
                isNullable: false, // Password should not be nullable
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'password');

    }

}
