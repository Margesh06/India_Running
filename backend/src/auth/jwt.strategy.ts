import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service'; // Import your AuthService

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) { // Inject AuthService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ramsiyaram', // Replace with your actual secret
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload); // Use validateUser
    if (!user) {
      return null; // Or throw an exception
    }
    return user;
  }
}