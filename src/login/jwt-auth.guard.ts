import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization.replace('Bearer ', '');

    const jwtDecode = (await this.jwtService.decode(token)) as any;

    if (jwtDecode) {
      const { role } = jwtDecode;

      return roles.includes(role);
    }

    return false;
  }
}
