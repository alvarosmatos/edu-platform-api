import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  enroll(data: any) {
    return this.prisma.enrollment.create({ data });
  }

  async isUserEnrolled(userId: number, courseId: number): Promise<boolean> {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });
    return !!enrollment;
  }
  
  findByUser(userId: number) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
    });
  }

  findAll() {
    return this.prisma.enrollment.findMany({
      include: { user: true, course: true },
    });
  }

  findOne(id: number) {
    return this.prisma.enrollment.findUnique({
      where: { id },
      include: { user: true, course: true },
    });
  }

  remove(id: number) {
    return this.prisma.enrollment.delete({
      where: { id },
    });
  }
}