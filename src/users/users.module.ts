import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserLessonsModule } from '../user-lessons/user-lessons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Fornece o repositório para o Service
    forwardRef(() => UserLessonsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}