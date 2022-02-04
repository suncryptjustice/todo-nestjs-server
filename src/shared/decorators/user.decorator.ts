import { createParamDecorator } from '@nestjs/common/decorators';
import { ExecutionContext } from '@nestjs/common';
import { Roles } from '../../modules/auth/enum/role.enum';

export interface UserPayload {
  id: number;
  role: Roles;
}

const User = createParamDecorator<UserPayload>(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export default User;
