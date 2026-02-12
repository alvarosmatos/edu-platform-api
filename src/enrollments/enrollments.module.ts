import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { AuthModule } from '../auth/auth.module';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [
    // Registra as entidades para uso no service
    TypeOrmModule.forFeature([Enrollment, Course]), 
    AuthModule
  ],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService], // Permite que outros módulos verifiquem matrículas
})
export class EnrollmentsModule {}