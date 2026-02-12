import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Curso de Inglês' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Descrição do curso', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'gratuito' })
  @IsString()
  type: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}