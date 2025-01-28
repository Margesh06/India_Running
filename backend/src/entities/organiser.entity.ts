import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Organiser")
export class Organiser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone_no: number;

  @Column()
  email: string;
}
