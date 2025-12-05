import { Module } from '@nestjs/common';
import { UserLessonsService } from './user-lessons.service';
import { UserLessonsController } from './user-lessons.controller';
import { LessonsModule } from '../lessons/lessons.module';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [LessonsModule, EnrollmentsModule, PrismaModule],
  controllers: [UserLessonsController],
  providers: [UserLessonsService],
  exports: [UserLessonsService],
})
export class UserLessonsModule {}