import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private roles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const req: Request & { user?: UserDocument } = context
      .switchToHttp()
      .getRequest();

    if (!req.user) {
      throw new NotFoundException('User not found');
    }

    if (!this.roles.includes(req.user.role)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
