import { IsNumber, IsNotEmpty } from 'class-validator';

export class MarkLessonCompletedDto {
  @IsNumber()
  @IsNotEmpty()
  lessonId: number;
}