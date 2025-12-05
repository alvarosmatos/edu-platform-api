import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LessonsService } from '../lessons/lessons.service';
import { EnrollmentsService } from '../enrollments/enrollments.service';
import { MarkLessonCompletedDto } from './dto/mark-lesson-completed.dto';

@Injectable()
export class UserLessonsService {
  constructor(
    private prisma: PrismaService,
    private lessonsService: LessonsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  async markCompleted(data: MarkLessonCompletedDto & { userId: number }) {
    const { userId, lessonId } = data;

    const lesson = await this.lessonsService.findOne(lessonId);
    if (!lesson) throw new NotFoundException('Aula não encontrada.');

    const isEnrolled = await this.enrollmentsService.isUserEnrolled(userId, lesson.courseId);
    if (!isEnrolled) throw new BadRequestException('Usuário não matriculado neste curso.');

    // 1. Marca a aula como concluída (upsert garante que não haja duplicidade)
    await this.prisma.userLesson.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: {},
      create: { userId, lessonId },
    });

    // 2. Recalcula e armazena o resultado do progresso
    const progressResult = await this.updateCourseProgress(userId, lesson.courseId);

    // CORREÇÃO: Retornar o objeto de progresso em vez do registro de conclusão.
    return progressResult;
  }

  async updateCourseProgress(userId: number, courseId: number) {
    const totalLessons = await this.lessonsService.countLessonsInCourse(courseId);

    if (totalLessons === 0) {
        return this.prisma.courseProgress.upsert({
             where: { userId_courseId: { userId, courseId } },
             update: { progress: 0 },
             create: { userId, courseId, progress: 0 },
        });
    }

    const completedLessons = await this.prisma.userLesson.count({
      where: {
        userId,
        lesson: {
          courseId: courseId,
        },
      },
    });

    // Calcula a porcentagem (Arredonda para número inteiro)
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

    // 3. Salva/Atualiza e RETORNA o resultado do CourseProgress
    return this.prisma.courseProgress.upsert({
      where: { userId_courseId: { userId, courseId } },
      update: { progress: progressPercentage },
      create: { userId, courseId, progress: progressPercentage },
    });
  }
}