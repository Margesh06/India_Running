import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/data-source';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';  // Ensure CategoriesModule is imported
import { EventCategoryModule } from './categories/event_category/event_category.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    EventsModule,  
    CategoriesModule,  
    EventCategoryModule
  ],
})
export class AppModule {}
