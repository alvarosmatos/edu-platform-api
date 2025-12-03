import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  courseId: number;
}
