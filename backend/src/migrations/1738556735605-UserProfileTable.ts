import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserProfileTable1738556735605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "user_profile",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "profileImage",
                  type: "text",
                  isNullable: true,
                },
                {
                  name: "address",
                  type: "text",
                  isNullable: true,
                },
                {
                  name: "bio",
                  type: "text",
                  isNullable: true,
                },
                {
                  name: "state",
                  type: "enum",
                  enum: ["Maharastra", "Delhi", "Karnataka", "Uttar Pradesh", "Tamil Nadu", "West Bengal"],
                  isNullable: true,
                },
                {
                  name: "bloodGroup",
                  type: "enum",
                  enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
                  isNullable: true,
                },
                {
                  name: "nationality",
                  type: "enum",
                  enum: ["American", "Canadian", "British", "Austrialian", "Indian", "Brazilian", "German", "French", "Japanese"],
                  isNullable: true,
                },
                {
                  name: "pincode",
                  type: "varchar",
                  length: "6",
                  isNullable: true,
                },
                {
                  name: "phone_no",
                  type: "integer",
                  
                  isNullable: true,
                },
                {
                  name: "country",
                  type: "enum",
                  enum: ["United States", "Canada", "United Kingdom", "Austrialia", "India", "Brazil", "German", "France", "Japan"],
                  isNullable: true,
                },
                {
                  name: "emergencyContactName",
                  type: "varchar",
                  length: "50",
                  isNullable: true,
                },
                {
                  name: "emergencyContactNumber",
                  type: "bigint",
                  isNullable: true,
                },
                {
                  name: "gender",
                  type: "enum",
                  enum: ["Male", "Female"],
                  isNullable: true,
                },
                {
                  name: "dob",
                  type: "date",
                  isNullable: true,
                },
                {
                  name: "height",
                  type: "double precision",
                  isNullable: true,
                },
                {
                  name: "weight",
                  type: "double precision",
                  isNullable: true,
                },
                {
                  name: "shoesize",
                  type: "enum",
                  enum: ["6 UK", "7 UK", "8 UK", "9 UK", "10 UK"],
                  isNullable: true,
                },
                {
                  name: "tshirtsize",
                  type: "enum",
                  enum: ["XS", "S", "M", "L", "XL", "2XL"],
                  isNullable: true,
                },
                {
                  name: "raceType",
                  type: "enum",
                  enum: ["10K", "HALF MARATHON", "FULL MARATHON", "NOT APPLICABLE"],
                  isNullable: true,
                },
                {
                  name: "documentType",
                  type: "enum",
                  enum: ["Aadhar Card", "PAN Card", "Passport", "Driving License"],
                  isNullable: true,
                },
                {
                  name: "frontPhoto",
                  type: "text",
                  isNullable: true,
                },
                {
                  name: "backPhoto",
                  type: "text",
                  isNullable: true,
                },
                {
                  name: "user_id",
                  type: "int",
                  isUnique: true,
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
        await queryRunner.dropTable('user_profile');
    }

}
