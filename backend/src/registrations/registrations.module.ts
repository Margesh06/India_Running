// registration.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from '../entities/registration.entity';
import { RegistrationService } from './registrations.service';
import { RegistrationController } from './registrations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Registration])],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
