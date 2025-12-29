import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, // Injetado para lidar com o registro
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  async register(@Body() data: RegisterDto) {
    // CORREÇÃO: Chama o UsersService para criar o usuário
    return this.usersService.create(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Realizar login e obter token JWT' })
  async login(@Body() body: LoginDto) {
    // CORREÇÃO: Primeiro valida o usuário
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // CORREÇÃO: Passa o objeto do usuário (1 argumento) para o método login
    return this.authService.login(user);
  }
}