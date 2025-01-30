import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/data-source';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';  // Ensure CategoriesModule is imported

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    EventsModule,  
    CategoriesModule,  
  ],
})
export class AppModule {}
