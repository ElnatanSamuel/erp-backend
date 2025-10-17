import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller('logistics')
export class LogisticsController {
  constructor(private readonly svc: LogisticsService) {}

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
    const limit = Math.min(50, Math.max(1, Number(limitRaw) || 13));
    return this.svc.list({ q, status, page, limit });
  }

  @Get('kpis')
  async kpis() {
    return this.svc.kpis();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const x = await this.svc.get(id);
    if (!x) throw new NotFoundException('Request not found');
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
