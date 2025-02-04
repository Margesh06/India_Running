import { Controller, Post, Get, Req, Body, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

interface User {
  id: number;
  email: string;
}

declare module 'express' {
  interface Request {
    user: User;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('protected')
  getProtected(@Request() req: ExpressRequest) {
    return `This is a protected resource. User: ${req.user.email}`;
  }

  
}

