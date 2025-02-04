import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { User } from '../../entities/users.entity';
import { UserProfile } from 'src/entities/userProfile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile])],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
