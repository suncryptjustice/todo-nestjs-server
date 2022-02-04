import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Reflector } from '@nestjs/core/services';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getClass());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { role } = request.user;

    const hasRole = () => !!roles.find((item) => item === role);
    return role && hasRole();
  }
}
