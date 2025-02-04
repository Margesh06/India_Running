import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy'; 
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'ramsiyaram', 
      signOptions: { expiresIn: '10h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService], 
  exports: [AuthService], 
})
export class AuthModule {}