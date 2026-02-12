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
    
    // Busca o usuário no SQLite
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      this.logger.warn(`Usuário não encontrado no banco: ${email}`);
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    
    if (isMatch) {
      this.logger.log(`Senha validada com sucesso para: ${email}`);
      // Garante que o 'name' está sendo retornado aqui
      const { password, ...result } = user;
      return result;
    }

    this.logger.error(`Senha incorreta para o usuário: ${email}`);
    return null;
  }

  async login(user: any) {
    // O payload é o que o jwt-decode lerá no Vue
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role,
      name: user.name // <-- Certifique-se de que o banco preencheu este campo
    };
    
    this.logger.log(`Gerando token para o nome: ${user.name}`);

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