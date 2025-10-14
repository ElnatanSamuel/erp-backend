import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private svc: DashboardService) {}

  @Get('summary')
  async getSummary() {
    return this.svc.summary();
  }
}
