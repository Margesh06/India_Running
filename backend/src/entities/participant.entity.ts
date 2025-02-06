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

  @Column({ type: 'enum', enum: TShirtSize, nullable: true })
  tshirt_size?: TShirtSize;

  @Column({ type: 'int', nullable: true })
  shoe_size?: number;
}
