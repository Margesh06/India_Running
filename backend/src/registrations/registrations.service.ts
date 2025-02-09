// registration.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from '../entities/registration.entity';
import { CreateRegistrationDto } from './create-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
  ) {}

  async createRegistration(createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
    const registration = this.registrationRepository.create(createRegistrationDto);
    return this.registrationRepository.save(registration);
  }

  async getUserEventIds(userId: number): Promise<number[]> {
    const registrations = await this.registrationRepository.find({ where: { user_id: userId } });
    return registrations.map(reg => reg.event_id);
  }
}
