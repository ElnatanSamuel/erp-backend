import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { PaymentVoucherService } from './payment-voucher.service';

@Controller('payment-voucher')
export class PaymentVoucherController {
  constructor(private readonly svc: PaymentVoucherService) {}

  @Post()
  async create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Get()
  async list(
    @Query('q') q?: string,
    @Query('page') pageRaw?: string,
    @Query('limit') limitRaw?: string,
  ) {
    const page = Math.max(1, Number(pageRaw) || 1);
    const limit = Math.min(50, Math.max(1, Number(limitRaw) || 16));
    return this.svc.list({ q, page, limit });
  }

  @Get('count')
  async count() {
    const total = await this.svc.count();
    return { total };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const x = await this.svc.get(id);
    if (!x) throw new NotFoundException('Payment voucher not found');
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
