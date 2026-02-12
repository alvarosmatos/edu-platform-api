import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('lessons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard) 
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // NOVA ROTA: Resolve o erro 404 e busca por curso
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Listar aulas de um curso específico' })
  findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    // Busca no banco usando a relação courseId
    return this.lessonsService.findAllByCourse(courseId);
  }

  @Post()
  @Roles('ADMIN', 'PROFESSOR')
  @ApiOperation({ summary: 'Criar uma nova aula' })
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as aulas' })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma aula pelo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'PROFESSOR')
  @ApiOperation({ summary: 'Atualizar aula' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remover aula' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }
}