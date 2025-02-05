import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/users.entity';
import { UserProfile } from '../../entities/userProfile.entity';
import { RegisterDto } from './register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { fname, lname, email, password, role } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.userRepository.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    await this.userRepository.save(newUser);

    const newUserProfile = this.userProfileRepository.create({
      user_id: newUser,
    });

    await this.userProfileRepository.save(newUserProfile);

    return { message: 'User and user profile registered successfully' };
  }
}
