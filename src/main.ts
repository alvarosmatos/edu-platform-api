import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. Garantir que a pasta de uploads existe na raiz do subprojeto 'api'
  // process.cwd() aponta para ~/Desktop/edu-platform/apps/api
  const uploadPath = join(process.cwd(), 'uploads');
  const profilePath = join(uploadPath, 'profile');
  
  if (!existsSync(profilePath)) {
    logger.log(`Criando diretórios de upload em: ${profilePath}`);
    mkdirSync(profilePath, { recursive: true });
  }

  // 2. Servir arquivos estáticos (Essencial para a foto aparecer no Vue)
  app.useStaticAssets(uploadPath, {
    prefix: '/uploads/',
  });

  // 3. Configurações Globais
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  // 4. Swagger
  const config = new DocumentBuilder()
    .setTitle('Edu Platform API')
    .setDescription('Documentação da API SOS Idiomas - Debug Mode')
    .setVersion('1.1')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port);
  
  logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();