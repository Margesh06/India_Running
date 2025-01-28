import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp' })
  reg_at: Date;

}