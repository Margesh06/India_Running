import { Controller, Post, Body, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { AuthGuard } from '@nestjs/passport'; // For JWT guard
import { Request as ExpressRequest } from 'express'; // Import Express Request type

interface User { 
  id: number;
  email: string; 
  // ... other user properties
}

declare module 'express' { // Declaration merging for Express Request
    interface Request {
      user: User; // Add the user property with the correct type
    }
  }

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt')) // Protect this route with JWT guard
  @Post('protected') // Example protected route
  getProtected(@Request() req: ExpressRequest) { // Get the user from the request object
    return `This is a protected resource. User: ${req.user.email}`;
  }
}