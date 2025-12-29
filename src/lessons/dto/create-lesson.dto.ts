import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ example: 'Introdução ao NestJS', description: 'Título da aula' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Nesta aula vamos aprender...', description: 'Conteúdo da aula', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 1, description: 'ID do curso ao qual esta aula pertence' })
  @IsNumber()
  @IsNotEmpty()
  courseId: number;
}