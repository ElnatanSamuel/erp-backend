import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BudgetService } from './budget.service';

@Controller('budget')
export class BudgetController {
  constructor(private readonly svc: BudgetService) {}

  @Post()
  async create(@Body() body: { budgetNo: string; description: string; amountUsd: number; date: string; receivingOffice?: string }) {
    return this.svc.create(body);
  }

  @Get('entries')
  async entries(@Query('page') page?: string, @Query('limit') limit?: string, @Query('status') status?: 'draft' | 'submitted') {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 50;
    return this.svc.list({ page: p, limit: l, status });
  }

  @Post(':id/submit')
  async submit(@Param('id') id: string) {
    return this.svc.submit(id);
  }
}
