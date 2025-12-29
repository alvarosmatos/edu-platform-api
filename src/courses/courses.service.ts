import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCourseDto, authorId: number) {
    return this.prisma.course.create({
      data: {
        ...data,
        authorId, // Vincula o curso ao professor/admin logado
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: { 
        author: { select: { id: true, name: true, email: true } },
        _count: { select: { lessons: true } } 
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { 
        lessons: true,
        author: { select: { id: true, name: true } }
      },
    });
    if (!course) throw new NotFoundException(`Curso #${id} não encontrado`);
    return course;
  }

  async update(id: number, data: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }

  // NOVO: Lógica de geração de certificado baseada em progresso real
  async generateCertificate(courseId: number, userId: number) {
    const progress = await this.prisma.courseProgress.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });

    // Valida se o progresso existe e se é exatamente 100%
    if (!progress || progress.progress < 100) {
      throw new BadRequestException('Você ainda não concluiu 100% das aulas deste curso.');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });

    return {
      studentName: user.name,
      courseTitle: course.title,
      completionDate: new Date(),
      certificateId: `CERT-${userId}-${courseId}-${Date.now()}`,
      status: 'Validado pelo Sistema'
    };
  }
}