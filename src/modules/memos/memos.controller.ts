import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { MemosService } from './memos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import type { Response } from 'express';

@Controller('memos')
export class MemosController {
  constructor(private readonly svc: MemosService) {}

  @Post()
  async create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get()
  async list(
    @Query('q') q?: string,
    @Query('type') type?: string,
    @Query('page') pageRaw?: string,
    @Query('limit') limitRaw?: string,
  ) {
    const page = Math.max(1, Number(pageRaw) || 1);
    const limit = Math.min(50, Math.max(1, Number(limitRaw) || 16));
    return this.svc.list({ q, type, page, limit });
  }

  @Get('kpis')
  async kpis() {
    return this.svc.kpis();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const x = await this.svc.get(id);
    if (!x) throw new NotFoundException('Memo not found');
    return x;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(@UploadedFile() file: any) {
    if (!file) throw new Error('No file');
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const safeName = (file.originalname || 'attachment').replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const filename = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadsDir, filename);
    if (file.buffer) fs.writeFileSync(filePath, file.buffer); else if (file.path) fs.copyFileSync(file.path, filePath);
    return { name: file.originalname || filename, url: `/api/memos/attachment/${filename}` };
  }

  @Get('attachment/:filename')
  async serveAttachment(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (!fs.existsSync(filePath)) { res.status(404).send('Not found'); return; }
    res.sendFile(filePath);
  }
}
