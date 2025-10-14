import { Controller, Get, Post, Query, UploadedFile, UseInterceptors, Body, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { memoryStorage } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  async list(
    @Query('q') q?: string,
    @Query('role') role?: string,
    @Query('page') pageRaw?: string,
    @Query('limit') limitRaw?: string,
  ) {
    const page = Math.max(1, Number(pageRaw) || 1);
    const limit = Math.min(100, Math.max(1, Number(limitRaw) || 10));
    const { items, total } = await this.users.findMany({ q, role, page, limit });
    return {
      items: items.map((u: any) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        staffId: u.staffId,
        firstName: u.firstName,
        lastName: u.lastName,
        gender: u.gender,
        phone: u.phone,
        role: u.role,
        designation: u.designation,
        photoUrl: u.photoUrl,
      })),
      total,
      page,
      limit,
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('photo', { storage: memoryStorage() }))
  async create(
    @UploadedFile() file: any,
    @Body() body: { firstName: string; lastName: string; gender?: string; phone?: string; role?: string; designation?: string }
  ) {
    let photoUrl: string | undefined = undefined;
    if (file && (file.buffer || file.path)) {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const safeName = (file.originalname || 'photo').replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const filename = `${Date.now()}_${safeName}`;
      const filePath = path.join(uploadsDir, filename);
      if (file.buffer) {
        fs.writeFileSync(filePath, file.buffer);
      } else if (file.path) {
        fs.copyFileSync(file.path, filePath);
      }
      photoUrl = `/api/users/photo/${filename}`;
    }
    const result = await this.users.createStaff({ ...body, photoUrl });
    return {
      id: (result.user as any)._id,
      staffId: result.generatedStaffId,
      email: result.generatedEmail,
      name: result.user.name,
      photoUrl: result.user.photoUrl,
    };
  }

  @Get('photo/:filename')
  async servePhoto(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (!fs.existsSync(filePath)) {
      res.status(404).send('Not found');
      return;
    }
    res.sendFile(filePath);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const u: any = await this.users.getOneById(id);
    if (!u) return { error: 'Not found' };
    return {
      id: u._id,
      name: u.name,
      email: u.email,
      staffId: u.staffId,
      firstName: u.firstName,
      lastName: u.lastName,
      gender: u.gender,
      phone: u.phone,
      role: u.role,
      designation: u.designation,
      photoUrl: u.photoUrl,
    };
  }

  @UseInterceptors(FileInterceptor('photo', { storage: memoryStorage() }))
  @Post(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: any,
    @Body() body: { firstName?: string; lastName?: string; gender?: string; phone?: string; role?: string; designation?: string }
  ) {
    let photoUrl: string | undefined = undefined;
    if (file && (file.buffer || file.path)) {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
      const safeName = (file.originalname || 'photo').replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const filename = `${Date.now()}_${safeName}`;
      const filePath = path.join(uploadsDir, filename);
      if (file.buffer) fs.writeFileSync(filePath, file.buffer); else if (file.path) fs.copyFileSync(file.path, filePath);
      photoUrl = `/api/users/photo/${filename}`;
    }
    const updated: any = await this.users.updateStaff(id, { ...body, photoUrl });
    return {
      id: updated?._id,
      name: updated?.name,
      email: updated?.email,
      staffId: updated?.staffId,
      firstName: updated?.firstName,
      lastName: updated?.lastName,
      gender: updated?.gender,
      phone: updated?.phone,
      role: updated?.role,
      designation: updated?.designation,
      photoUrl: updated?.photoUrl,
    };
  }
}
