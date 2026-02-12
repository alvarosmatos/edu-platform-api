import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserLessonsService } from './user-lessons.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('user-lessons')
@UseGuards(JwtAuthGuard)
export class UserLessonsController {
  constructor(private readonly userLessonsService: UserLessonsService) {}

  @Post('complete')
  async complete(@Body('lessonId') lessonId: number, @CurrentUser() user: any) {
    return this.userLessonsService.markCompleted({
      userId: user.id,
      lessonId: +lessonId,
    });
  }
}