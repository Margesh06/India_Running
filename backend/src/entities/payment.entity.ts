import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentType {
  UPI = 'UPI',
  CARDS = 'CARDS',
  BANK_TRANSFER = 'NETBANKING',
  WALLET = 'WALLET'
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  event_id: number;

  @Column({ type: 'int' })
  user_id: number; 

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  status: PaymentStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({
    type: 'enum',
    enum: PaymentType
  })
  type: PaymentType; 

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number; 

  @Column({ type: 'varchar', nullable: true })
  razorpay_payment_id: string;

  @Column({ type: 'varchar', nullable: true })
  razorpay_order_id: string; 

  @Column({ type: 'varchar', nullable: true })
  error_message: string;
}
