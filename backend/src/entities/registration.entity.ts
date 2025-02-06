import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

@Entity('registrations')
export class Registration {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  event_id: number;

  @Column({ type: 'date' })
  reg_date: Date;

  @Column({ 
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  payment_status: PaymentStatus;
}