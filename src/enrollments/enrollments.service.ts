import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from '../courses/entities/course.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async enroll(courseId: number, userId: number) {
    // 1. Verifica se o curso existe no banco de dados
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Curso não encontrado');

    // 2. Verifica se o aluno já está matriculado
    const existing = await this.enrollmentRepository.findOne({
      where: { 
        user: { id: userId }, 
        course: { id: courseId } 
      },
    });

    if (existing) {
      throw new ConflictException('Você já está matriculado neste curso.');
    }

    // 3. Cria a nova matrícula vinculando o usuário e o curso
    const newEnrollment = this.enrollmentRepository.create({
      user: { id: userId },
      course: { id: courseId },
    });

    return this.enrollmentRepository.save(newEnrollment);
  }

  // Valida se o usuário tem acesso ao curso (usado para liberar aulas)
  async isUserEnrolled(userId: number, courseId: number): Promise<boolean> {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { 
        user: { id: userId }, 
        course: { id: courseId } 
      },
    });
    return !!enrollment;
  }

  // Busca todos os cursos matriculados do aluno para exibir no perfil
  async findByUser(userId: number) {
    return this.enrollmentRepository.find({
      where: { user: { id: userId } },
      relations: ['course'], // Traz os dados do curso junto (título, descrição)
    });
  }

  async remove(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({ where: { id } });
    if (!enrollment) throw new NotFoundException('Matrícula não encontrada');
    
    return this.enrollmentRepository.remove(enrollment);
  }
}