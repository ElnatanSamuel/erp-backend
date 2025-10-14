import { MaintenanceService } from './maintenance.service';
import type { Response } from 'express';
export declare class MaintenanceController {
    private readonly svc;
    constructor(svc: MaintenanceService);
    create(body: any): Promise<{
        id: string;
    }>;
    list(monthRaw?: string, yearRaw?: string): Promise<{
        items: {
            id: string;
            title: string;
            description: string | undefined;
            status: string | undefined;
            date: Date;
            itemName: any;
            itemNumber: any;
            maintenanceType: any;
            recurringOption: any;
        }[];
    }>;
    kpis(): Promise<{
        scheduled: number;
        completed: number;
        pending: number;
        overdue: number;
    }>;
    get(id: string): Promise<any>;
    setStatus(id: string, body: {
        status: string;
    }): Promise<{
        readonly ok: true;
    }>;
    upload(file: any): Promise<{
        name: any;
        url: string;
    }>;
    serveAttachment(filename: string, res: Response): Promise<void>;
    setAttachment(id: string, body: {
        name: string;
        url: string;
    }): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=maintenance.controller.d.ts.map