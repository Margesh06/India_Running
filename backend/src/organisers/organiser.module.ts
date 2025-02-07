import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Organiser } from "../entities/organiser.entity";
import { OrganiserService } from "./organiser.service";
import { OrganiserController } from "./organiser.controller";
import { LoginModule } from "./login/login.module";

@Module({
  imports: [TypeOrmModule.forFeature([Organiser]), LoginModule],
  providers: [OrganiserService],
  controllers: [OrganiserController],
})
export class OrganiserModule {}
