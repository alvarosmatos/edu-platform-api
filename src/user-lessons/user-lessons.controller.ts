import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserLessonsService } from './user-lessons.service';
import { MarkLessonCompletedDto } from './dto/mark-lesson-completed.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserWithoutPassword } from '../users/users.service'; 

@Controller('user-lessons')
@UseGuards(JwtAuthGuard) 
export class UserLessonsController {
  constructor(private readonly userLessonsService: UserLessonsService) {}

  @Post('complete')
  markCompleted(@Body() data: MarkLessonCompletedDto, @CurrentUser() user: UserWithoutPassword) {
    return this.userLessonsService.markCompleted({
      ...data,
      userId: user.id, 
    });
  }
}