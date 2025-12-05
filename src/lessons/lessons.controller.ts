import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('lessons')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplicamos o RolesGuard em todas as rotas
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // Apenas ADMIN e PROFESSOR podem criar (Permissão herdada da Fase 1)
  @Post()
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  create(@Body() data: CreateLessonDto) {
    // data.courseId já é number devido ao DTO e ValidationPipe, mas garantimos a permissão.
    return this.lessonsService.create(data);
  }

  // Todos logados podem ver
  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  // Apenas ADMIN e PROFESSOR podem atualizar
  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  update(@Param('id') id: string, @Body() data: UpdateLessonDto) {
    return this.lessonsService.update(+id, data);
  }

  // Apenas ADMIN e PROFESSOR podem deletar
  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.PROFESSOR)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}