import { Model } from 'mongoose';
import { Maintenance, MaintenanceDocument } from './schemas/maintenance.schema';
export declare class MaintenanceService {
    private model;
    constructor(model: Model<MaintenanceDocument>);
    create(input: Partial<Maintenance>): Promise<{
        id: string;
    }>;
    list({ month, year }: {
        month?: number;
        year?: number;
    }): Promise<{
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
    get(id: string): Promise<any>;
    setStatus(id: string, status: string): Promise<{
        readonly ok: true;
    }>;
    updateAttachment(id: string, name: string, url: string): Promise<{
        readonly ok: true;
    }>;
    kpis(): Promise<{
        scheduled: number;
        completed: number;
        pending: number;
        overdue: number;
    }>;
}
//# sourceMappingURL=maintenance.service.d.ts.map