import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/data-source';
import { EventsModule } from './events/events.module';
import { CategoriesModule } from './categories/categories.module';  // Ensure CategoriesModule is imported
import { EventCategoryModule } from './categories/event_category/event_category.module'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './auth/register/register.module';
import { UserProfileModule } from './userProfile/userProfile.module';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsModule } from './payments/payments.module';
import { RegistrationModule } from './registrations/registrations.module';
import { OrganiserModule } from './organisers/organiser.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    EventsModule,  
    CategoriesModule,  
    EventCategoryModule,
    UsersModule,
    AuthModule,
    RegisterModule,
    UserProfileModule,
    PaymentsModule,
    RegistrationModule,
    OrganiserModule
  ],
})
export class AppModule {}
