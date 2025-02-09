// registration.controller.ts
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { RegistrationService } from './registrations.service';
import { CreateRegistrationDto } from './create-registration.dto';
import { Registration } from '../entities/registration.entity';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async create(@Body() createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
    return this.registrationService.createRegistration(createRegistrationDto);
  }

  @Get(':userId')
  async getUserEvents(@Param('userId') userId: number): Promise<number[]> {
    return this.registrationService.getUserEventIds(userId);
  }
}
