import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { EventsModule } from './events/events.module';
import { TypeOrmConfig } from './config/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig), 
    EventsModule, 
  ],
  controllers: [AppController], 
  providers: [AppService], 
})
export class AppModule {}
