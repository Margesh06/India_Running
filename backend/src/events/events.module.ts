import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from '../entities/event.entity';
import { EventCategory } from '../entities/eventCategory.entity';  
import { Category } from '../entities/category.entity';
import { Organiser } from '../entities/organiser.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Event, EventCategory, Category, Organiser])  // Add EventCategory and Category
    ],
    controllers: [EventsController],
    providers: [EventsService],
  })
export class EventsModule {}
