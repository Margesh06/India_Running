// registration.dto.ts
import { IsInt, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { PaymentStatus } from '../entities/registration.entity';

export class CreateRegistrationDto {
  @IsInt()
  user_id: number;

  @IsInt()
  event_id: number;

  @IsDateString()
  reg_date: string;

  @IsEnum(PaymentStatus)
  @IsOptional()
  payment_status: PaymentStatus = PaymentStatus.PENDING;
}
