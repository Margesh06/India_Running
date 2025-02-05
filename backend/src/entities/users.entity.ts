
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: string;

  @CreateDateColumn({name:'createdAt' , type: "timestamptz" }) 
  reg_at: Date;
}
