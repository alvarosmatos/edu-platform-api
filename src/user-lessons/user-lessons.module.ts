import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLessonsService } from './user-lessons.service';
import { UserLessonsController } from './user-lessons.controller';
import { MailModule } from '../mail/mail.module';
import { UserLesson } from './entities/user-lesson.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Module({
  imports: [
    // Registra as entidades necessárias para o progresso real no SQLite
    TypeOrmModule.forFeature([UserLesson, Lesson]), 
    MailModule
  ],
  controllers: [UserLessonsController],
  providers: [UserLessonsService],
  exports: [UserLessonsService], // Exportado para que o UsersService calcule a porcentagem
})
export class UserLessonsModule {}