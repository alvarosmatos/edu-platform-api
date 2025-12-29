import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Curso de NestJS', description: 'Título do curso' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    example: 'Aprenda a criar APIs profissionais', 
    description: 'Breve descrição do curso',
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;
}