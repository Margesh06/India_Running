import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEventTableb1738056364532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "event" (
                "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY, 
                "name" varchar NOT NULL, 
                "description" text NOT NULL, 
                "venue" text NOT NULL,  
                "image" text NOT NULL, 
                "organiser_id" integer NOT NULL, 
                "event_type" varchar CHECK ("event_type" IN ('OnGround', 'Virtual', 'OnGround+Virtual')) NOT NULL, 
                "start_date" timestamp NOT NULL, 
                "end_date" timestamp NOT NULL, 
                "country" varchar NOT NULL, 
                "state" varchar NOT NULL, 
                "city" varchar NOT NULL, 
                "pincode" varchar NOT NULL, 
                "banner_image" text NOT NULL,
                CONSTRAINT "PK_event_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_event_organizer" FOREIGN KEY ("organiser_id") REFERENCES "Organiser"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }
}
