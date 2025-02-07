import { Controller, Post, Body } from "@nestjs/common";
import { LoginService } from "./login.service";
import { LoginDto } from "./login.dto";

@Controller("organisers/login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.validateOrganiser(loginDto);
  }
}
