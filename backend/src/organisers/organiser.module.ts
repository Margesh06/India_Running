import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organiser } from '../entities/organiser.entity';
import { OrganiserService } from './organisers.service';
import { OrganiserController } from './organisers.controller';
import { User } from '../entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organiser, User])],
  providers: [OrganiserService],
  controllers: [OrganiserController],
})
export class OrganiserModule {}
