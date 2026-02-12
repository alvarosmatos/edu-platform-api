import { MailerModule } from '@nestjs-modules/mailer';
import { Module, Global } from '@nestjs/common';
import { MailService } from './mail.service';

@Global() // O torna disponível globalmente sem precisar importar em cada módulo
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Altere para seu provedor
        port: 587,
        secure: false,
        auth: {
          user: 'seu-email@gmail.com',
          pass: 'sua-senha-de-app',
        },
      },
      defaults: {
        from: '"Plataforma Edu" <noreply@escola.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}