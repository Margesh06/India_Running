import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables"); // Ensure secret exists
    }

    try {
      const decoded = jwt.verify(token, secret) as unknown as JwtPayload;

      if (!decoded.sub || !decoded.email) {
        throw new UnauthorizedException('Invalid token payload');
      }

      request.user = { id: decoded.sub, email: decoded.email };
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
