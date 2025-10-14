import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { MemosService } from '../memos/memos.service';
import { PaymentVoucherService } from '../payment-voucher/payment-voucher.service';

@Injectable()
export class DashboardService {
  constructor(
    private users: UsersService,
    private memos: MemosService,
    private paymentVouchers: PaymentVoucherService,
  ) {}

  async summary() {
    const [staffCount, memoData, paymentData, recent] = await Promise.all([
      this.users.countAll(),
      this.memos.list({ page: 1, limit: 5 }),
      this.paymentVouchers.list({ page: 1, limit: 5 }),
      this.users.findMany({ page: 1, limit: 8 }),
    ]);

    const memos = memoData.items.map((m: any) => ({
      sn: m.id.substring(0, 8),
      subject: m.title,
      date: m.date,
      from: m.sentFrom,
      to: m.sentTo,
    }));

    const payments = paymentData.items.map((p: any) => ({
      sn: p.id.substring(0, 8),
      subject: p.subject,
      date: p.date,
      preparedBy: p.preparedBy,
      sendTo: p.sendTo,
    }));

    const staff = recent.items.map((u: any, idx: number) => ({
      sn: String(idx + 1).padStart(2, '0'),
      name: u.name,
      role: u.role || '-',
      designation: u.designation || '-',
      photoUrl: u.photoUrl,
    }));

    return {
      stats: {
        staffCount,
        applicationCount: 0,
        projectsCount: 0,
        departmentsCount: 0,
        trendStaff: '+0%',
        trendApplications: '+0%',
        trendProjects: '+0%',
      },
      memos,
      payments,
      staff,
    };
  }
}
