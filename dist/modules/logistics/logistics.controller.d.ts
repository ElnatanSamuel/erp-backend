import { LogisticsService } from './logistics.service';
export declare class LogisticsController {
    private readonly svc;
    constructor(svc: LogisticsService);
    create(body: any): Promise<{
        id: string;
    }>;
    list(q?: string, status?: string, pageRaw?: string, limitRaw?: string): Promise<{
        items: {
            id: string;
            title: string;
            purpose: string | undefined;
            amount: number | undefined;
            requestedBy: string | undefined;
            sentTo: string | undefined;
            date: Date;
            status: string | undefined;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    kpis(): Promise<{
        total: number;
        totalAmount: any;
        pending: number;
        approved: number;
    }>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=logistics.controller.d.ts.map