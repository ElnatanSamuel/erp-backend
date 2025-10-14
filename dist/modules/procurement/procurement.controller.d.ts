import { ProcurementService } from './procurement.service';
export declare class ProcurementController {
    private readonly svc;
    constructor(svc: ProcurementService);
    create(body: any): Promise<{
        id: string;
    }>;
    list(q?: string, status?: string, pageRaw?: string, limitRaw?: string): Promise<{
        items: {
            id: string;
            itemName: string;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
            requestedBy: string | undefined;
            sentTo: string | undefined;
            date: Date;
            status: string | undefined;
            hasAttachment: string | undefined;
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
    update(id: string, body: any): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=procurement.controller.d.ts.map