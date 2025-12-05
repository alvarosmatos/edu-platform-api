import { IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class UpdateUserRoleDto {
  @IsEnum(UserRole, {
    message: `Role deve ser um dos seguintes valores: ${Object.values(UserRole).join(', ')}`,
  })
  role: string; 
}