import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger para documentação visual
  const config = new DocumentBuilder()
    .setTitle('S.O.S IDIOMAS')
    .setDescription('Documentação das rotas da plataforma de educação')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validações globais (Pipe)
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true 
  }));

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
  console.log('Documentação disponível em http://localhost:3000/api');
}
bootstrap();