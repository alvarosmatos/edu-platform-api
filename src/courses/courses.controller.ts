import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('courses')
@ApiBearerAuth()
@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @Roles('ADMIN', 'PROFESSOR')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Criar curso (Apenas Admin/Professor)' })
  create(@Body() createCourseDto: CreateCourseDto, @CurrentUser() user: any) {
    return this.coursesService.create(createCourseDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os cursos' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver detalhes de um curso' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'PROFESSOR')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Atualizar curso' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Excluir curso (Apenas Admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }

  // NOVO: Rota para o aluno emitir seu certificado
  @Get(':id/certificate')
  @ApiOperation({ summary: 'Gerar certificado de conclusão (Requer 100% de progresso)' })
  async getCertificate(
    @Param('id', ParseIntPipe) courseId: number,
    @CurrentUser() user: any,
  ) {
    return this.coursesService.generateCertificate(courseId, user.id);
  }
}