import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Patch, 
  UseGuards, 
  ParseIntPipe, 
  NotFoundException,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar um novo usuário (Público)' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('upload-photo') // Rota reativada para o Vue poder chamar
  @ApiOperation({ summary: 'Fazer upload da foto de perfil' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      // Define o destino absoluto para a pasta na raiz da API
      destination: join(process.cwd(), 'uploads', 'profile'), 
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me/profile')
  @ApiOperation({ summary: 'Ver perfil do usuário logado' })
  async getProfile(@CurrentUser() user: any) {
    const userData = await this.usersService.findOne(user.id);
    if (!userData) throw new NotFoundException('Usuário não encontrado');
    const { password, ...result } = userData;
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('me/update')
  @ApiOperation({ summary: 'Atualizar dados do próprio perfil' })
  async update(@CurrentUser() user: any, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(user.id, updateUserDto);
    const { password, ...result } = updatedUser;
    return result;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    const { password, ...result } = user;
    return result;
  }
}