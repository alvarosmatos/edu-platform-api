import { Injectable, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLessonsService } from '../user-lessons/user-lessons.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => UserLessonsService))
    private userLessonsService: UserLessonsService,
  ) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const user = this.userRepository.create({ 
      ...data, 
      password: hashedPassword,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000)
    });
    return await this.userRepository.save(user);
  }


  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ 
      where: { id },
      relations: ['enrollments', 'enrollments.course'] 
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }
    await this.userRepository.update(id, {
      ...data,
      updatedAt: Math.floor(Date.now() / 1000)
    });
    return this.findOne(id);
  }
}