import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateCourseDto } from './dto/create-course.dto';

@ApiTags('courses') // Organiza em uma seção específica no Swagger
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBearerAuth() // Ativa o cadeado para inserir o Token no Swagger
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Criar um novo curso' })
  @ApiResponse({ status: 201, description: 'Curso criado com sucesso.' })
  @ApiResponse({ status: 403, description: 'Proibido: Token inválido ou ausente.' })
  async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cursos' })
  @ApiResponse({ status: 200, description: 'Retorna a lista de todos os cursos.' })
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar curso por ID' })
  @ApiResponse({ status: 200, description: 'Retorna os detalhes de um curso específico.' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado.' })
  async findOne(@Param('id') id: string) {
    return await this.coursesService.findOne(+id);
  }
}