import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { UserLessonsModule } from './user-lessons/user-lessons.module'; 

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, CoursesModule, LessonsModule, EnrollmentsModule, UserLessonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}