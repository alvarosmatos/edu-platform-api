import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth') // Rota Base
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register') // Rota Completa: POST /auth/register
  register(@Body() data: RegisterDto) {
    return this.auth.register(data);
  }

  @Post('login') // Rota Completa: POST /auth/login
  login(@Body() body: LoginDto) {
    return this.auth.login(body.email, body.password);
  }
}