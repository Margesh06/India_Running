// src/event_category/event_category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCategoryController } from './event_category.controller';
import { EventCategoryService } from './event_category.service';
import { EventCategory } from '../../entities/eventCategory.entity';
import { Event } from '../../entities/event.entity';
import { Category } from '../../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventCategory, Event, Category])],
  controllers: [EventCategoryController],
  providers: [EventCategoryService],
  exports: [EventCategoryService], 
})
export class EventCategoryModule {}
