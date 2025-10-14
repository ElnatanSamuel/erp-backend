import { UsersService } from '../users/users.service';
import { MemosService } from '../memos/memos.service';
import { PaymentVoucherService } from '../payment-voucher/payment-voucher.service';
export declare class DashboardService {
    private users;
    private memos;
    private paymentVouchers;
    constructor(users: UsersService, memos: MemosService, paymentVouchers: PaymentVoucherService);
    summary(): Promise<{
        stats: {
            staffCount: number;
            applicationCount: number;
            projectsCount: number;
            departmentsCount: number;
            trendStaff: string;
            trendApplications: string;
            trendProjects: string;
        };
        memos: {
            sn: any;
            subject: any;
            date: any;
            from: any;
            to: any;
        }[];
        payments: {
            sn: any;
            subject: any;
            date: any;
            preparedBy: any;
            sendTo: any;
        }[];
        staff: {
            sn: string;
            name: any;
            role: any;
            designation: any;
            photoUrl: any;
        }[];
    }>;
}
//# sourceMappingURL=dashboard.service.d.ts.map