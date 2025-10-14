import { Model } from 'mongoose';
import { Logistic, LogisticDocument } from './schemas/logistic.schema';
export declare class LogisticsService {
    private model;
    constructor(model: Model<LogisticDocument>);
    create(input: Partial<Logistic>): Promise<{
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
    get(id: string): Promise<any>;
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
//# sourceMappingURL=logistics.service.d.ts.map