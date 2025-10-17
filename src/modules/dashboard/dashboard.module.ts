import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from '../users/users.module';
import { MemosModule } from '../memos/memos.module';
import { PaymentVoucherModule } from '../payment-voucher/payment-voucher.module';
import { StaffApplicationsModule } from '../staff-applications/staff-applications.module';

@Module({
  imports: [UsersModule, MemosModule, PaymentVoucherModule, StaffApplicationsModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
