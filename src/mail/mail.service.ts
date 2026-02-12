import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendCertificateEmail(userEmail: string, userName: string, courseTitle: string) {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: `🎓 Seu certificado de ${courseTitle} está pronto!`,
        html: `
          <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px;">
            <h2>Parabéns, ${userName}!</h2>
            <p>Você concluiu 100% do curso <strong>${courseTitle}</strong>.</p>
            <p>Seu certificado já foi validado pelo sistema e está disponível para download.</p>
          </div>
        `,
      });
      console.log(`[MailService] E-mail enviado com sucesso para: ${userEmail}`);
    } catch (error) {
      console.error('[MailService] Falha ao enviar e-mail:', error);
    }
  }
}