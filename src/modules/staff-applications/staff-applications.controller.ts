import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { StaffApplicationsService } from './staff-applications.service';

@Controller('staff-applications')
export class StaffApplicationsController {
  constructor(private readonly svc: StaffApplicationsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `resume-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  async uploadFile(@UploadedFile() file: any) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }
    const baseUrl = process.env.BASE_URL || 'http://localhost:4000';
    return {
      name: file.filename,
      url: `${baseUrl}/uploads/${file.filename}`,
    };
  }

  @Post()
  async create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get()
  async list(
    @Query('q') q?: string,
    @Query('status') status?: string,
    @Query('page') pageRaw?: string,
    @Query('limit') limitRaw?: string,
  ) {
    const page = Math.max(1, Number(pageRaw) || 1);
    const limit = Math.min(50, Math.max(1, Number(limitRaw) || 10));
    return this.svc.list({ q, status, page, limit });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const x = await this.svc.get(id);
    if (!x) throw new NotFoundException('Application not found');
    return x;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.svc.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }
}
