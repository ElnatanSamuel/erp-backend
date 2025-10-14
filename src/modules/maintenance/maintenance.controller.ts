import { Body, Controller, Get, NotFoundException, Param, Post, Query, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import type { Response } from 'express';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly svc: MaintenanceService) {}

  @Post()
  async create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get()
  async list(
    @Query('month') monthRaw?: string,
    @Query('year') yearRaw?: string,
  ) {
    const month = monthRaw !== undefined ? Number(monthRaw) : undefined; // 0-indexed
    const year = yearRaw !== undefined ? Number(yearRaw) : undefined;
    return this.svc.list({ month, year });
  }

  @Get('kpis')
  async kpis() { return this.svc.kpis(); }

  @Get(':id')
  async get(@Param('id') id: string) {
    const x = await this.svc.get(id);
    if (!x) throw new NotFoundException('Maintenance not found');
    return x;
  }

  @Post(':id/status')
  async setStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.svc.setStatus(id, body?.status);
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
    return { name: file.originalname || filename, url: `/api/maintenance/attachment/${filename}` };
  }

  @Get('attachment/:filename')
  async serveAttachment(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (!fs.existsSync(filePath)) { res.status(404).send('Not found'); return; }
    res.sendFile(filePath);
  }

  @Post(':id/attachment')
  async setAttachment(@Param('id') id: string, @Body() body: { name: string; url: string }) {
    return this.svc.updateAttachment(id, body?.name || '', body?.url || '');
  }
}
