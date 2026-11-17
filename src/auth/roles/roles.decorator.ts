import { Reflector } from '@nestjs/core';
import { UserRole } from './roles.js';
import { SetMetadata } from '@nestjs/common';

export const Roles = (args: UserRole[]) => SetMetadata('roles', args);
