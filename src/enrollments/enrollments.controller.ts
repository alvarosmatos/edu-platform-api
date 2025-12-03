import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  enroll(@Body() data: CreateEnrollmentDto) {
    return this.enrollmentsService.enroll(data);
  }

  @Get('user/:id')
  findByUser(@Param('id') id: string) {
    return this.enrollmentsService.findByUser(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(+id);
  }
}
