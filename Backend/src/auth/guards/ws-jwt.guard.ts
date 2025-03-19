// src/auth/guards/ws-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const authToken = client.handshake.headers.authorization;
    
    try {
      if (!authToken) {
        return false;
      }
      const payload = this.jwtService.verify<{ sub: string }>(authToken);
      client.handshake.headers.authorization = payload.sub; // Set userId in headers
      return true;
    } catch (error) {
      return false;
    }
  }
}
