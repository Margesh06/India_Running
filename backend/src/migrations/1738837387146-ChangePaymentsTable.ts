import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangePaymentsTable1738837387146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add 'razorpay_order_id' column to the 'payments' table
        await queryRunner.addColumn(
            'payments',
            new TableColumn({
                name: 'razorpay_order_id',
                type: 'varchar',
                isNullable: true, // This allows the column to be nullable if needed
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the 'razorpay_order_id' column from the 'payments' table
        await queryRunner.dropColumn('payments', 'razorpay_order_id');
    }

}
