import { ApiProperty } from '@nestjs/swagger';

export class CertificateResponseDto {
  @ApiProperty({ example: 'João Silva' })
  studentName: string;

  @ApiProperty({ example: 'Curso de NestJS' })
  courseTitle: string;

  @ApiProperty({ example: '2025-12-28T12:00:00Z' })
  completionDate: Date;

  @ApiProperty({ example: 'CERT-123456' })
  certificateId: string;
}