import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Organiser } from "../../entities/organiser.entity";
import { LoginService } from "./login.service";
import { LoginController } from "./login.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([Organiser]),
    JwtModule.register({
      secret: "yourSecretKey", 
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
