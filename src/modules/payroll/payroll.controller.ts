import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly svc: PayrollService) {}

  @Get('kpis')
  async kpis() {
    return this.svc.kpis();
  }

  @Get('summary')
  async summary() {
    return this.svc.summary();
  }

  @Post('definitions')
  async createDefinition(
    @Body()
    body: {
      title: string;
      level: string;
      basicSalary: number;
      allowance: number;
      grossSalary: number;
      deductions: number;
      netSalary: number;
    },
  ) {
    return this.svc.createDefinition(body);
  }

  @Get('definitions')
  async listDefinitions(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 50;
    return this.svc.listDefinitions({ page: p, limit: l });
  }

  @Get('definitions/:id')
  async getDefinition(@Param('id') id: string) {
    const item = await this.svc.getDefinition(id);
    if (!item) throw new NotFoundException('Salary definition not found');
    return item;
  }

  @Put('definitions/:id')
  async updateDefinition(
    @Param('id') id: string,
    @Body() body: Partial<{ title: string; level: string; basicSalary: number; allowance: number; grossSalary: number; deductions: number; netSalary: number }>,
  ) {
    return this.svc.updateDefinition(id, body);
  }

  @Delete('definitions/:id')
  async deleteDefinition(@Param('id') id: string) {
    return this.svc.deleteDefinition(id);
  }

  // ---- Tax Definitions ----
  @Post('taxes')
  async createTax(@Body() body: { taxType: string; percent: number }) {
    return this.svc.createTaxDefinition(body);
  }

  @Get('taxes')
  async listTaxes(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 50;
    return this.svc.listTaxDefinitions({ page: p, limit: l });
  }

  @Get('taxes/:id')
  async getTax(@Param('id') id: string) {
    const item = await this.svc.getTaxDefinition(id);
    if (!item) throw new NotFoundException('Tax definition not found');
    return item;
  }

  @Put('taxes/:id')
  async updateTax(@Param('id') id: string, @Body() body: Partial<{ taxType: string; percent: number }>) {
    return this.svc.updateTaxDefinition(id, body);
  }

  @Delete('taxes/:id')
  async deleteTax(@Param('id') id: string) {
    return this.svc.deleteTaxDefinition(id);
  }

  // ---- Payslips ----
  @Post('payslips')
  async createPayslip(@Body() body: any) {
    return this.svc.createPayslip(body);
  }

  @Get('payslips')
  async listPayslips(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 50;
    return this.svc.listPayslips({ page: p, limit: l });
  }

  @Get('payslips/:id')
  async getPayslip(@Param('id') id: string) {
    const item = await this.svc.getPayslip(id);
    if (!item) throw new NotFoundException('Payslip not found');
    return item;
  }

  @Put('payslips/:id')
  async updatePayslip(@Param('id') id: string, @Body() body: any) {
    return this.svc.updatePayslip(id, body);
  }

  @Delete('payslips/:id')
  async deletePayslip(@Param('id') id: string) {
    return this.svc.deletePayslip(id);
  }

  @Post('payslips/batch')
  async createPayslipsBatch(@Body() body: { items: any[]; date?: string }) {
    const items = Array.isArray(body?.items) ? body.items : [];
    const date = body?.date;
    return this.svc.createPayslipsBatch(items as any[], date);
  }
}
