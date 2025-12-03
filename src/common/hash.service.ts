import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly rounds = 10;

  async hash(value: string) {
    return bcrypt.hash(value, this.rounds);
  }

  async compare(value: string, hashed: string) {
    return bcrypt.compare(value, hashed);
  }
}
