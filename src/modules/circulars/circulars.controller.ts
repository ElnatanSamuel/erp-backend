import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { CircularsService } from './circulars.service';

@Controller('circulars')
export class CircularsController {
  constructor(private readonly svc: CircularsService) {}

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
    const limit = Math.min(50, Math.max(1, Number(limitRaw) || 13));
    return this.svc.list({ q, type, page, limit });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const x = await this.svc.get(id);
    if (!x) throw new NotFoundException('Circular not found');
    return x;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }
}
