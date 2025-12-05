import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  // Garante a exportação do serviço para ser usado por outros módulos (ex: UserLessonsModule)
  exports: [LessonsService], 
})
export class LessonsModule {}