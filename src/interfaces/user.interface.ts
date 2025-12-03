// src/interfaces/user.interface.ts (Novo Arquivo)

export interface UserWithPassword {
  id: number; 
  email: string;
  name: string;
  password: string; // Inclui senha para fins de validação no AuthService
}

export interface JwtPayload {
  sub: number; 
  email: string;
}