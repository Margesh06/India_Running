import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1738319806426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                { name: 'id', type: 'serial', isPrimary: true },
                { name: 'fname', type: 'varchar', isNullable: false },
                { name: 'lname', type: 'varchar', isNullable: false },
                { name: 'email', type: 'varchar', isUnique: true, isNullable: false },
                { name: 'createdAt', type: 'timestamptz', default: 'now()' },
              ],
            }),
          );

          
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
