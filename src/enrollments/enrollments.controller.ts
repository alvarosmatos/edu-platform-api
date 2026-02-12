import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('enrollments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Realizar matrícula no curso' })
  enroll(@Body() data: CreateEnrollmentDto, @CurrentUser() user: any) {
    // Envia o curso do corpo da requisição e o ID do usuário extraído do Token
    return this.enrollmentsService.enroll(data.courseId, user.id);
  }

  @Get('my')
  @ApiOperation({ summary: 'Listar cursos que o aluno está matriculado' })
  findMyEnrollments(@CurrentUser() user: any) {
    return this.enrollmentsService.findByUser(user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar uma matrícula' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.remove(id);
  }
}