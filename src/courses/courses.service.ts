import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  // MÉTODO ADICIONADO: Corrige o erro TS2339 e habilita a criação via Swagger
  async create(createCourseDto: any) {
    const newCourse = this.courseRepository.create({
      ...createCourseDto,
      // Define o autor padrão (ex: ID 1) ou pegue do token se o seu DTO não enviar
      authorId: createCourseDto.authorId || 1, 
      createdAt: Math.floor(Date.now() / 1000), // Formato integer para o SQLite
      updatedAt: Math.floor(Date.now() / 1000),
    });
    
    return await this.courseRepository.save(newCourse);
  }

  async findAll() {
    return await this.courseRepository.find({
      relations: ['lessons'], // Mantém o vínculo com as aulas
      order: { id: 'ASC' }
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({ 
      where: { id },
      relations: ['lessons'] 
    });
    if (!course) throw new NotFoundException('Curso não encontrado');
    return course;
  }
}