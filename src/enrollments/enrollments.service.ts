import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  // → Este é o método que o controller chama
  enroll(data: any) {
    return this.prisma.enrollment.create({ data });
  }

  // → Também usado no controller
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
