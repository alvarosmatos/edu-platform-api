import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkLessonCompletedDto {
  @ApiProperty({ example: 1, description: 'ID da aula que foi concluída' })
  @IsNumber()
  @IsNotEmpty()
  lessonId: number;
}