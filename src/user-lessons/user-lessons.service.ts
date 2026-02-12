import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLesson } from './entities/user-lesson.entity';

@Injectable()
export class UserLessonsService {
  constructor(
    @InjectRepository(UserLesson)
    private userLessonRepository: Repository<UserLesson>,
  ) {}

  // courseId tornado opcional (?) para resolver o erro de argumento no Controller
  async markCompleted(data: { userId: number; lessonId: number; courseId?: number }) {
    let userLesson = await this.userLessonRepository.findOne({
      where: { 
        user: { id: data.userId }, 
        lesson: { id: data.lessonId } 
      },
    });

    if (!userLesson) {
      userLesson = this.userLessonRepository.create({
        user: { id: data.userId },
        lesson: { id: data.lessonId },
        // Só salva o courseId se ele for enviado
        course: data.courseId ? { id: data.courseId } : undefined,
      });
    }

    userLesson.completed = true;
    userLesson.completedAt = new Date();

    return await this.userLessonRepository.save(userLesson);
  }

  async findOne(id: number) {
    const result = await this.userLessonRepository.findOne({
      where: { id },
      relations: ['course', 'lesson', 'user'],
    });

    if (!result) throw new NotFoundException('Progresso não encontrado');
    return result;
  }
}