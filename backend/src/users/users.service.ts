import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserRole(id: number, role: string): Promise<User> {
    // Correct the findOne() method usage to pass 'where' with 'id'
    const user = await this.userRepository.findOne({
      where: { id: id }, // Correctly pass the condition using 'where'
    });

    if (!user) {
      throw new Error("User not found");
    }

    user.role = role; // Update the role to 'organiser'
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }
}
