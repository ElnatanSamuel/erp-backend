import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { Get, Headers, Res } from '@nestjs/common';
import type { Response } from 'express';

class RegisterDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  name!: string;

  @MinLength(6)
  password!: string;
}

class LoginDto {
  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('me')
  async me(@Headers('authorization') authHeader?: string) {
    const user = await this.auth.me(authHeader);
    return { user };
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    // Clear common cookie names that may be set by Better Auth or custom JWT flows
    const names = [
      'better-auth.session',
      'better-auth.session.sig',
      'auth_session',
      'session',
      'access_token',
      'refresh_token',
    ];
    for (const n of names) {
      // Clear both httpOnly and non-httpOnly variants
      res.cookie(n, '', { maxAge: 0, httpOnly: true, path: '/' });
      res.cookie(n, '', { maxAge: 0, httpOnly: false, path: '/' });
    }
    return { ok: true } as const;
  }
}
