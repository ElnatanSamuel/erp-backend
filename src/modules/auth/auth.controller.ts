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
  async logout() {
    // JWT tokens are stored client-side, no server-side cleanup needed
    return { ok: true } as const;
  }
}
