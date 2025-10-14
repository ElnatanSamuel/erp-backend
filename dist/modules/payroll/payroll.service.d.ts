import { Model } from 'mongoose';
import { SalaryDefinitionDocument } from './schemas/salary-definition.schema';
import { TaxDefinitionDocument } from './schemas/tax-definition.schema';
import { Payslip, PayslipDocument } from './schemas/payslip.schema';
export declare class PayrollService {
    private model;
    private taxModel;
    private payslipModel;
    constructor(model: Model<SalaryDefinitionDocument>, taxModel: Model<TaxDefinitionDocument>, payslipModel: Model<PayslipDocument>);
    createDefinition(input: {
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
    createTaxDefinition(input: {
        taxType: string;
        percent: number;
    }): Promise<{
        id: string;
    }>;
    listTaxDefinitions({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            taxType: string;
            percent: number;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    getTaxDefinition(id: string): Promise<{
        id: string;
        taxType: string;
        percent: number;
    } | null>;
    updateTaxDefinition(id: string, input: Partial<{
        taxType: string;
        percent: number;
    }>): Promise<{
        readonly ok: true;
    }>;
    deleteTaxDefinition(id: string): Promise<{
        readonly ok: true;
    }>;
    createPayslip(input: Partial<Payslip>): Promise<{
        id: string;
    }>;
    listPayslips({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
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
    updatePayslip(id: string, input: Partial<Payslip>): Promise<{
        readonly ok: true;
    }>;
    deletePayslip(id: string): Promise<{
        readonly ok: true;
    }>;
    createPayslipsBatch(items: Partial<Payslip>[], date?: string): Promise<{
        created: number;
        ids: string[];
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
    } | null>;
    updateDefinition(id: string, input: Partial<{
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
    listDefinitions({ page, limit }: {
        page?: number;
        limit?: number;
    }): Promise<{
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
}
//# sourceMappingURL=payroll.service.d.ts.map