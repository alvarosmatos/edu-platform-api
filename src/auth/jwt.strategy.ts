// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret-key',
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    // Busca o usuário, que agora inclui o campo 'role' (graças à modificação no UsersService)
    const user = await this.usersService.findOne(payload.sub); 

    if (!user) {
      throw new UnauthorizedException('Token inválido ou usuário inexistente.');
    }
    
    // Retorna o objeto user completo (incluindo id, email, name, role)
    return user; 
  }
}