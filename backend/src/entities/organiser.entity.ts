import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("organisers")
export class Organiser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "fname" })
  firstName: string;

  @Column({ name: "lname" })
  lastName: string;

  @Column({ type: "varchar", length: 10 })
  phone_no: string;

  @Column({ name: "org_name" })
  organizationName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "text" })
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: "varchar", length: 6 })
  pincode: string;

  @Column({ name: "pan_card", type: "text", unique: true })
  panCard: string;
}
