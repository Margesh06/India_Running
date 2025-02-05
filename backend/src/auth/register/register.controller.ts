import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from './register.dto';

@Controller('auth')
export class RegisterController {
  constructor(private readonly authService: RegisterService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}