import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Tentando validar usuário: ${email}`);
    
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      this.logger.warn(`Usuário não encontrado no banco: ${email}`);
      return null;
    }

    // Compara a senha digitada com o hash do banco
    const isMatch = await bcrypt.compare(pass, user.password);
    
    if (isMatch) {
      this.logger.log(`Senha validada com sucesso para: ${email}`);
      const { password, ...result } = user;
      return result;
    }

    this.logger.error(`Senha incorreta para o usuário: ${email}`);
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}