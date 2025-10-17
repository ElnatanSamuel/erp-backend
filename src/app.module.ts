import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './modules/core/core.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { BudgetModule } from './modules/budget/budget.module';
import { PayrollModule } from './modules/payroll/payroll.module';
import { CircularsModule } from './modules/circulars/circulars.module';
import { LogisticsModule } from './modules/logistics/logistics.module';
import { MemosModule } from './modules/memos/memos.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { ProcurementModule } from './modules/procurement/procurement.module';
import { PaymentVoucherModule } from './modules/payment-voucher/payment-voucher.module';
import { StaffApplicationsModule } from './modules/staff-applications/staff-applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/erp'),
    CoreModule,
    UsersModule,
    AuthModule,
    DashboardModule,
    BudgetModule,
    PayrollModule,
    CircularsModule,
    LogisticsModule,
    MemosModule,
    NotificationsModule,
    MaintenanceModule,
    TrainingsModule,
    StocksModule,
    ProcurementModule,
    PaymentVoucherModule,
    StaffApplicationsModule,
  ],
})
export class AppModule {}
