import { BudgetService } from './budget.service';
export declare class BudgetController {
    private readonly svc;
    constructor(svc: BudgetService);
    create(body: {
        budgetNo: string;
        description: string;
        amountUsd: number;
        date: string;
        receivingOffice?: string;
    }): Promise<{
        id: string;
    }>;
    entries(page?: string, limit?: string, status?: 'draft' | 'submitted'): Promise<{
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
//# sourceMappingURL=budget.controller.d.ts.map