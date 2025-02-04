import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto; 
    const user = await this.usersRepository.findOne({ where: { email } }); 
    console.log("email matched",user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id }; 
    const token = await this.jwtService.sign(payload);

    return { access_token: token };
  }


  async validateUser(payload: any): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email: payload.email } });
    return user || undefined;
  }
}