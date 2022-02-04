import { SetMetadata } from '@nestjs/common/decorators';
import { Roles } from '../enum/role.enum';

export const ROLES_KEY = 'roles';
export const UserRoles = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
