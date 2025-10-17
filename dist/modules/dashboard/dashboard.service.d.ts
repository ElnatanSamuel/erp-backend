import { UsersService } from '../users/users.service';
import { MemosService } from '../memos/memos.service';
import { PaymentVoucherService } from '../payment-voucher/payment-voucher.service';
import { StaffApplicationsService } from '../staff-applications/staff-applications.service';
export declare class DashboardService {
    private users;
    private memos;
    private paymentVouchers;
    private staffApplications;
    constructor(users: UsersService, memos: MemosService, paymentVouchers: PaymentVoucherService, staffApplications: StaffApplicationsService);
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
        applicationStats: {
            pending: number;
            reviewed: number;
            approved: number;
            rejected: number;
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