import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors, Res, Param } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import type { Response } from 'express';

@Controller('stocks')
export class StocksController {
  constructor(private readonly svc: StocksService) {}

  @Post()
  async create(@Body() body: any) { return this.svc.create(body); }

  @Get()
  async list(
    @Query('q') q?: string,
    @Query('page') pageRaw?: string,
    @Query('limit') limitRaw?: string,
    @Query('view') view?: 'stocks' | 'inventory',
  ) {
    const page = Math.max(1, Number(pageRaw) || 1);
    const limit = Math.min(100, Math.max(1, Number(limitRaw) || 20));
    return this.svc.list({ q, page, limit, view });
  }

  @Get('kpis')
  async kpis() { return this.svc.kpis(); }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(@UploadedFile() file: any) {
    if (!file) throw new Error('No file');
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
    const safeName = (file.originalname || 'image').replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const filename = `${Date.now()}_${safeName}`;
    const filePath = path.join(uploadsDir, filename);
    if (file.buffer) fs.writeFileSync(filePath, file.buffer); else if (file.path) fs.copyFileSync(file.path, filePath);
    return { name: file.originalname || filename, url: `/api/stocks/image/${filename}` };
  }

  @Get('image/:filename')
  async serveImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (!fs.existsSync(filePath)) { res.status(404).send('Not found'); return; }
    res.sendFile(filePath);
  }
}
