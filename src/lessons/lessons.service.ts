import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateLessonDto) {
    try {
      // 1. Valida se o curso existe antes de tentar criar a aula
      const course = await this.prisma.course.findUnique({ 
        where: { id: data.courseId } 
      });

      if (!course) {
        throw new NotFoundException(`Curso #${data.courseId} não encontrado. Não é possível criar aula para um curso inexistente.`);
      }

      // 2. Cria a aula vinculada ao curso
      return await this.prisma.lesson.create({ 
        data: {
          title: data.title,
          content: data.content,
          courseId: data.courseId,
        } 
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      
      // Captura erros de banco (ex: coluna faltando) e detalha no terminal
      console.error('Erro ao criar aula no Prisma:', error);
      throw new InternalServerErrorException('Erro interno ao salvar a aula. Verifique se o banco de dados está atualizado.');
    }
  }

  async findAll() {
    return this.prisma.lesson.findMany({
      include: { course: { select: { title: true } } }
    });
  }

  async findOne(id: number) {
    const lesson = await this.prisma.lesson.findUnique({ 
      where: { id },
      include: { course: true }
    });
    
    if (!lesson) {
      throw new NotFoundException(`Aula #${id} não encontrada`);
    }
    return lesson;
  }

  async update(id: number, data: UpdateLessonDto) {
    await this.findOne(id); // Garante que existe antes de atualizar
    return this.prisma.lesson.update({ 
      where: { id }, 
      data 
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Garante que existe antes de remover
    return this.prisma.lesson.delete({ where: { id } });
  }

  // Método vital para o cálculo de progresso (usado no UserLessonsService)
  async countLessonsInCourse(courseId: number): Promise<number> {
    return this.prisma.lesson.count({
      where: { courseId },
    });
  }
}