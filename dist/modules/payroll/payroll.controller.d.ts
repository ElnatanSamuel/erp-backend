import { PayrollService } from './payroll.service';
export declare class PayrollController {
    private readonly svc;
    constructor(svc: PayrollService);
    kpis(): Promise<{
        gross: any;
        tax: number;
        loan: number;
        net: any;
    }>;
    summary(): Promise<{
        months: string[];
        series: {
            gross: number;
            net: number;
            tax: number;
            loan: number;
        }[];
    }>;
    createDefinition(body: {
        title: string;
        level: string;
        basicSalary: number;
        allowance: number;
        grossSalary: number;
        deductions: number;
        netSalary: number;
    }): Promise<{
        id: string;
    }>;
    listDefinitions(page?: string, limit?: string): Promise<{
        items: {
            id: string;
            title: string;
            level: string;
            basicSalary: number;
            allowance: number;
            grossSalary: number;
            deductions: number;
            netSalary: number;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getDefinition(id: string): Promise<{
        id: string;
        title: string;
        level: string;
        basicSalary: number;
        allowance: number;
        grossSalary: number;
        deductions: number;
        netSalary: number;
    }>;
    updateDefinition(id: string, body: Partial<{
        title: string;
        level: string;
        basicSalary: number;
        allowance: number;
        grossSalary: number;
        deductions: number;
        netSalary: number;
    }>): Promise<{
        readonly ok: true;
    }>;
    deleteDefinition(id: string): Promise<{
        readonly ok: true;
    }>;
    createTax(body: {
        taxType: string;
        percent: number;
    }): Promise<{
        id: string;
    }>;
    listTaxes(page?: string, limit?: string): Promise<{
        items: {
            id: string;
            taxType: string;
            percent: number;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getTax(id: string): Promise<{
        id: string;
        taxType: string;
        percent: number;
    }>;
    updateTax(id: string, body: Partial<{
        taxType: string;
        percent: number;
    }>): Promise<{
        readonly ok: true;
    }>;
    deleteTax(id: string): Promise<{
        readonly ok: true;
    }>;
    createPayslip(body: any): Promise<{
        id: string;
    }>;
    listPayslips(page?: string, limit?: string): Promise<{
        items: {
            id: string;
            staffName: string;
            title: string;
            level: string;
            paymentName: any;
            payMonth: any;
            payYear: any;
            basicSalary: number;
            allowances: number;
            grossSalary: number;
            deduction: number;
            netSalary: number;
            createdAt: any;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getPayslip(id: string): Promise<any>;
    updatePayslip(id: string, body: any): Promise<{
        readonly ok: true;
    }>;
    deletePayslip(id: string): Promise<{
        readonly ok: true;
    }>;
    createPayslipsBatch(body: {
        items: any[];
        date?: string;
    }): Promise<{
        created: number;
        ids: string[];
    }>;
}
//# sourceMappingURL=payroll.controller.d.ts.map