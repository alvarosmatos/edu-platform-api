import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho conforme seu projeto
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  // MÉTODO VITAL: Filtra as aulas pelo ID do curso
  async findAllByCourse(courseId: number) {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        courseId: courseId, // Nome exato da coluna no seu banco
      },
      orderBy: {
        id: 'asc',
      },
    });

    return lessons;
  }

  async create(createLessonDto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: createLessonDto,
    });
  }

  async findAll() {
    return this.prisma.lesson.findMany();
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException(`Aula com ID ${id} não encontrada`);
    return lesson;
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  async remove(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}