import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module'; // ADICIONE ESTE
import { UserLessonsModule } from './user-lessons/user-lessons.module';

// Entidades baseadas no seu banco físico
import { User } from './users/entities/user.entity';
import { Lesson } from './lessons/entities/lesson.entity';
import { UserLesson } from './user-lessons/entities/user-lesson.entity';
import { Course } from './courses/entities/course.entity';
import { Enrollment } from './enrollments/entities/enrollment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'prisma', 'dev.db'), 
      entities: [User, Lesson, UserLesson, Course, Enrollment],
      synchronize: false, // Mantém seus dados seguros
      logging: true,
    }),
    UsersModule,
    AuthModule,
    CoursesModule, // REGISTRE O MÓDULO AQUI
    UserLessonsModule,
  ],
})
export class AppModule {}