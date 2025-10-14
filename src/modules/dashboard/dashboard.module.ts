import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from '../users/users.module';
import { MemosModule } from '../memos/memos.module';
import { PaymentVoucherModule } from '../payment-voucher/payment-voucher.module';

@Module({
  imports: [UsersModule, MemosModule, PaymentVoucherModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
