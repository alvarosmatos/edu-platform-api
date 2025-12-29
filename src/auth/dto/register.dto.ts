import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'aluno@escola.com', description: 'O e-mail para login' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha (mínimo 4 caracteres)', minLength: 4 })
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  name: string;
}