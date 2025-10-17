import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private svc;
    constructor(svc: DashboardService);
    getSummary(): Promise<{
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
//# sourceMappingURL=dashboard.controller.d.ts.map