import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { TrainingsService } from './trainings.service';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly svc: TrainingsService) {}

  @Post()
  async create(@Body() body: any) { return this.svc.create(body); }

  @Get()
  async list(
    @Query('q') q?: string,
    @Query('page') pageRaw?: string,
    @Query('limit') limitRaw?: string,
  ) {
    const page = Math.max(1, Number(pageRaw) || 1);
    const limit = Math.min(100, Math.max(1, Number(limitRaw) || 20));
    return this.svc.list({ q, page, limit });
  }

  @Get('kpis')
  async kpis() { return this.svc.kpis(); }

  @Get(':id')
  async get(@Param('id') id: string) {
    const x = await this.svc.get(id);
    if (!x) throw new NotFoundException('Training not found');
    return x;
  }

  @Post(':id/status')
  async setStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.svc.setStatus(id, body?.status);
  }
}
