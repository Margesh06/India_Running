import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  profileImage: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'enum', enum: ['Maharastra', 'Delhi', 'Karnataka', 'Uttar Pradesh', 'Tamil Nadu', 'West Bengal'], nullable:true })
  state: string;

  @Column({ type: 'enum',enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] , nullable: true })
  bloodGroup: string;

  @Column({ type: 'enum',enum: ['American', 'Canadian', 'British', 'Austrialian', 'Indian', 'Brazilian', 'German', 'French', 'Japanese'] , nullable: true })
  nationality: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  pincode: string;

  @Column({ type: 'bigint', nullable: true })
  phone_no: number;

  @Column({ type: 'enum', enum: ['United States', 'Canada', 'United Kingdom', 'Austrialia', 'India', 'Brazil', 'German', 'France', 'Japan'], nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emergencyContactName: string;

  @Column({ type:"bigint", nullable: true })
  emergencyContactNumber: number;

  @Column({ type: 'enum', enum: ['Male', 'Female'], nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({type: 'double precision', nullable: true})
  height: number;

  @Column({type:'double precision', nullable: true})
  weight: number;

  @Column({type:'enum',enum: ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'], nullable: true})
  shoesize: string;

  @Column({ type: 'enum', enum:['XS', 'S', 'M', 'L', 'XL', '2XL'], nullable: true })
  tshirtsize: string;

  @Column({ type: 'enum', enum:['10K', 'HALF MARATHON', 'FULL MARATHON', 'NOT APPLICABLE'], nullable: true })
  raceType: string;

  @Column({ type: 'enum', enum:['Aadhar Card', 'PAN Card', 'Passport', 'Driving License'], nullable: true })
  documentType: string;

  @Column({ type:'text',nullable: true })
  frontPhoto: string;

  @Column({ type:'text',nullable: true })
  backPhoto: string;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'user_id' })
  user_id: User;
}
