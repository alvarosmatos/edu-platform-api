import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  async enroll(courseId: number, userId: number) {
    // Verifica se o curso existe
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Curso não encontrado');

    const existing = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    if (existing) {
      throw new ConflictException('Você já está matriculado neste curso.');
    }

    return this.prisma.enrollment.create({
      data: { userId, courseId },
    });
  }

  // MÉTODO NOVO: Necessário para validar a conclusão de aulas
  async isUserEnrolled(userId: number, courseId: number): Promise<boolean> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    return !!enrollment;
  }

  async findByUser(userId: number) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: { course: true },
    });
  }

  async remove(id: number) {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}