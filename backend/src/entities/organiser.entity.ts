import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./users.entity"; // Ensure correct path

@Entity("organisers")
export class Organiser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "fname" })
  firstName: string;

  @Column({ name: "lname" })
  lastName: string;

  @Column()
  phone_no: number;

  @Column({ name: "org_name" })
  organizationName: string;

  @Column()
  email: string;

  @Column({ type: "text" })
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: "text" })
  pincode: string;

  @Column({ name: "pan_card", type: "text" })
  panCard: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User; 
}
