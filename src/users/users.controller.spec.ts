// src/users/users.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Importa o Guard de Auth
import { Request } from 'express'; 

@Controller('users')
// CORREÇÃO: Protege todas as rotas com o JWT Guard
@UseGuards(JwtAuthGuard) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Mantido, mas só deve ser acessível por admins, ou movido para o AuthModule
  @Post()
  create(@Body() data: CreateUserDto) {
    // Note: A senha não está hashed aqui.
    return this.usersService.create(data); 
  }

  @Get('me')
  getMe(@Req() req: Request) {
    // Retorna os dados do usuário logado (armazenados em req.user pela JwtStrategy)
    return req.user; 
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}