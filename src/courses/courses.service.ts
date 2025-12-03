import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.course.create({ data });
  }

  findAll() {
    return this.prisma.course.findMany({
      include: { lessons: true, enrollments: true },
    });
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: { lessons: true, enrollments: true },
    });
  }

  update(id: number, data: any) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
}
