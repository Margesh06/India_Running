import { IsInt, IsEnum, IsDateString } from 'class-validator';
import { PaymentStatus, PaymentType } from '../entities/payment.entity';

export class CreatePaymentDto {
  @IsInt()
  event_id: number;

  @IsInt()
  user_id: number;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsDateString()
  timestamp: string;
}
