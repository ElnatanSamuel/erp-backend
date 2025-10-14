import { HydratedDocument } from 'mongoose';
export declare class Payslip {
    staffName: string;
    title: string;
    level: string;
    paymentName?: string;
    payMonth?: string;
    payYear?: string;
    basicSalary: number;
    housingAllowance: number;
    transportAllowance: number;
    utilityAllowance: number;
    productivityAllowance: number;
    communicationAllowance: number;
    inconvenienceAllowance: number;
    grossSalary: number;
    taxPayee: number;
    employeePension: number;
    totalDeduction: number;
    netSalary: number;
}
export type PayslipDocument = HydratedDocument<Payslip>;
export declare const PayslipSchema: import("mongoose").Schema<Payslip, import("mongoose").Model<Payslip, any, any, any, import("mongoose").Document<unknown, any, Payslip, any, {}> & Payslip & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Payslip, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Payslip>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Payslip> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=payslip.schema.d.ts.map