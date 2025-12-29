import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'CHAVE_ULTRA_SECRETA_123',
    });
  }

  async validate(payload: any) {
    // IMPORTANTE: Retornar o ID e a ROLE para que o RolesGuard funcione!
    return { 
      id: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}