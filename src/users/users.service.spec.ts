import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; email: string; password: string }) {
    if (!data || !data.name || !data.email || !data.password) {
      throw new Error('Os campos name, email e password são obrigatórios');
    }

    return await this.prisma.user.create({
      data,
    });
  }
}
