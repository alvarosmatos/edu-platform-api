import { SetMetadata } from '@nestjs/common';

// Definição exata dos tipos permitidos para evitar erros de compilação
export type UserRole = 'ADMIN' | 'PROFESSOR' | 'STUDENT';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);