import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';  // Import TypeOrmModule
import { Payment } from '../entities/payment.entity';  // Import Payment entity


@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),  // Register Payment entity with TypeOrm
  ],
  providers: [
    PaymentsService,
  ],
  controllers: [PaymentsController],  // Register PaymentsController
})
export class PaymentsModule {}
