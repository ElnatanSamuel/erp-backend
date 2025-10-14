import { HydratedDocument } from 'mongoose';
export declare class SalaryDefinition {
    title: string;
    level: string;
    basicSalary: number;
    allowance: number;
    grossSalary: number;
    deductions: number;
    netSalary: number;
}
export type SalaryDefinitionDocument = HydratedDocument<SalaryDefinition>;
export declare const SalaryDefinitionSchema: import("mongoose").Schema<SalaryDefinition, import("mongoose").Model<SalaryDefinition, any, any, any, import("mongoose").Document<unknown, any, SalaryDefinition, any, {}> & SalaryDefinition & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SalaryDefinition, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SalaryDefinition>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<SalaryDefinition> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=salary-definition.schema.d.ts.map