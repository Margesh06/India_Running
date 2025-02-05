import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organiser } from '../entities/organiser.entity';
import { CreateOrganiserDto } from './create-organisers.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class OrganiserService {
  constructor(
    @InjectRepository(Organiser)
    private readonly organiserRepository: Repository<Organiser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Register an organiser
  async registerOrganiser(dto: CreateOrganiserDto): Promise<Organiser> {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingOrganiser = await this.organiserRepository.findOne({ where: { email: dto.email } });
    if (existingOrganiser) {
      throw new ConflictException('Email already registered as organiser');
    }

    const newOrganiser = this.organiserRepository.create({ ...dto, user });
    return this.organiserRepository.save(newOrganiser);
  }

  // Get all organisers
  async getOrganisers(): Promise<Organiser[]> {
    return this.organiserRepository.find({ relations: ['user'] });
  }

  // Get organiser by ID with NotFoundException if not found
  async getOrganiserById(id: number): Promise<Organiser> {
    const organiser = await this.organiserRepository.findOne({ where: { id }, relations: ['user'] });
    if (!organiser) {
      throw new NotFoundException(`Organiser with id ${id} not found`);
    }
    return organiser;
  }
}
