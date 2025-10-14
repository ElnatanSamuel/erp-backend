import { Model } from 'mongoose';
import { BudgetEntryDocument } from './schemas/budget.schema';
export declare class BudgetService {
    private model;
    constructor(model: Model<BudgetEntryDocument>);
    create(input: {
        budgetNo: string;
        description: string;
        amountUsd: number;
        date: string | Date;
        receivingOffice?: string;
    }): Promise<{
        id: string;
    }>;
    list({ page, limit, status }: {
        page?: number;
        limit?: number;
        status?: 'draft' | 'submitted';
    }): Promise<{
        items: {
            id: string;
            budgetNo: string;
            description: string;
            amountUsd: number;
            date: Date;
            receivingOffice: string | null;
            status: "draft" | "submitted";
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    submit(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=budget.service.d.ts.map