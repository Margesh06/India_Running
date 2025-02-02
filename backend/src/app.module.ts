import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/data-source';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';  // Ensure CategoriesModule is imported
import { EventCategoryModule } from './categories/event_category/event_category.module'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './auth/register/register.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    EventsModule,  
    CategoriesModule,  
    EventCategoryModule,
    UsersModule,
    AuthModule,
    RegisterModule
  ],
})
export class AppModule {}
