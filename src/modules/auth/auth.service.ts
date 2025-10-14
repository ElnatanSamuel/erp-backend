import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(input: { email: string; name: string; password: string }) {
    const existing = await this.users.findByEmail(input.email);
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await this.users.createUser({
      email: input.email,
      name: input.name,
      passwordHash,
    });
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async login(input: { email: string; password: string }) {
    const user = await this.users.findByEmail(input.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { token, user: { id: user.id, email: user.email, name: user.name } };
  }

  async me(bearerToken?: string) {
    if (!bearerToken) throw new UnauthorizedException('Missing token');
    const token = bearerToken.replace(/^Bearer\s+/i, '');
    try {
      const payload = await this.jwt.verifyAsync<{ sub: string; email: string }>(token);
      const user = await this.users.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');
      return { id: user.id, email: user.email, name: user.name };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
