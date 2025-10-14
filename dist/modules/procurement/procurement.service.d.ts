import { Model } from 'mongoose';
import { Procurement, ProcurementDocument } from './schemas/procurement.schema';
export declare class ProcurementService {
    private model;
    constructor(model: Model<ProcurementDocument>);
    create(input: Partial<Procurement>): Promise<{
        id: string;
    }>;
    list({ q, status, page, limit }: {
        q?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
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
    get(id: string): Promise<any>;
    update(id: string, input: Partial<Procurement>): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
    kpis(): Promise<{
        total: number;
        totalAmount: any;
        pending: number;
        approved: number;
    }>;
}
//# sourceMappingURL=procurement.service.d.ts.map