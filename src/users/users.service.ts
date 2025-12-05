import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type UserWithoutPassword = {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private userSelect = { 
    id: true, 
    email: true, 
    name: true, 
    role: true, 
    createdAt: true, 
    updatedAt: true 
  };

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<UserWithoutPassword | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    return user as UserWithoutPassword;
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    }) as unknown as UserWithoutPassword[];
  }

  async findOne(id: number): Promise<UserWithoutPassword> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!user) throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);

    return user as UserWithoutPassword;
  }

  async update(id: number, data: UpdateUserDto): Promise<UserWithoutPassword> {
    try {
      return (await this.prisma.user.update({
        where: { id },
        data,
        select: this.userSelect,
      })) as UserWithoutPassword;
    } catch (error) {
      if (error?.code === 'P2025') throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      throw error;
    }
  }
  
  async updateRole(id: number, role: string): Promise<UserWithoutPassword> { 
    try {
      return (await this.prisma.user.update({
        where: { id },
        data: { role },
        select: this.userSelect,
      })) as UserWithoutPassword;
    } catch (error) {
      if (error?.code === 'P2025') throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return { message: `Usuário com ID ${id} removido com sucesso.` };
    } catch (error) {
      if (error?.code === 'P2025') throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      throw error;
    }
  }
}