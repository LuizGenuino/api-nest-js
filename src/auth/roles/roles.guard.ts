import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from './roles.js';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        const { user } = context.switchToHttp().getRequest();
        const requiredRoles = this.reflector.getAllAndOverride('roles', [
            context.getHandler(), 
            context.getClass()
        ]);

        if(!requiredRoles) {
            return true;
        }

        return requiredRoles.some((role: UserRole) => user.role?.includes(role));
    }
}
