import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../modules/users/entities/user.entity';

export const Roles = (...roles: string[]) => {
  return (
    target: object,
    key?: string | symbol,
    descriptor?: TypedPropertyDescriptor<unknown>,
  ) => {
    Reflect.defineMetadata('roles', roles, descriptor?.value || target);
    return descriptor || target;
  };
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];
    if (!requiredRoles.length) return true;

    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    if (!user?.roles) {
      throw new ForbiddenException('Access denied - no user roles');
    }

    const hasRole = user.roles.some((role) =>
      requiredRoles.includes(role.name),
    );
    if (!hasRole) {
      throw new ForbiddenException('Access denied - insufficient permissions');
    }

    return true;
  }
}
