import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../common/hash.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private hash: HashService,
  ) {}

  async register(data: CreateUserDto) {
    const exists = await this.usersService.findByEmail(data.email);
    if (exists) throw new BadRequestException('E-mail já está em uso.');

    const hashed = await this.hash.hash(data.password);

    const user = await this.usersService.create({
      ...data,
      password: hashed,
    });

    return { message: 'Usuário criado com sucesso', user };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const valid = await this.hash.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas.');

    const token = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }
}
