import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum TShirtSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int' })
  event_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  bib_no: string;

  @Column({ type: 'int' })
  reg_date: number;

  @Column({ type: 'int' })
  emergency_no: number;

  @Column({ type: 'varchar' })
  emergency_name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight?: number;

  @Column({ type: 'varchar', nullable: true })
  tshirt_size: TShirtSize | null;

  @Column({ type: 'int', nullable: true })
  shoe_size?: number;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: string;

  @Column({ type: 'varchar', nullable: true })
  gender?: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'bigint', nullable:true })  
  phone: number;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true })
  pincode?: string;

  @Column({ type: 'varchar', nullable: true })
  blood_group?: string;

  @Column({ type: 'varchar', nullable: true })
  emergency_contact_name?: string;

  @Column({ type: 'varchar', nullable: true })
  emergency_contact_number?: string;

  @Column({ type: 'boolean', default: false })
  terms_and_condition: boolean;

  @Column({ type: 'text', nullable: true })
  medical_condition?: string;
}
