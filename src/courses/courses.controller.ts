// src/courses/courses.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard'; // Importado
import { Roles } from '../common/decorators/roles.decorator'; // Importado
import { UserRole } from '../common/enums/user-role.enum'; // Importado

@Controller('courses')
@UseGuards(JwtAuthGuard) // Protege todas as rotas com autenticação JWT
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Protegido: Apenas ADMIN e PROFESSOR podem criar cursos
  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  create(@Body() data: CreateCourseDto) {
    return this.coursesService.create(data);
  }

  // Acesso para todos os usuários logados (ADMIN, PROFESSOR, STUDENT)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  // Acesso para todos os usuários logados
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  // Protegido: Apenas ADMIN e PROFESSOR podem atualizar cursos
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  update(@Param('id') id: string, @Body() data: UpdateCourseDto) {
    return this.coursesService.update(+id, data);
  }

  // Protegido: Apenas ADMIN e PROFESSOR podem deletar cursos
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}