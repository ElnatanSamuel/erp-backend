import { HydratedDocument } from 'mongoose';
export declare class BudgetEntry {
    budgetNo: string;
    description: string;
    amountUsd: number;
    date: Date;
    receivingOffice?: string;
    status: 'draft' | 'submitted';
}
export type BudgetEntryDocument = HydratedDocument<BudgetEntry>;
export declare const BudgetEntrySchema: import("mongoose").Schema<BudgetEntry, import("mongoose").Model<BudgetEntry, any, any, any, import("mongoose").Document<unknown, any, BudgetEntry, any, {}> & BudgetEntry & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BudgetEntry, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<BudgetEntry>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<BudgetEntry> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=budget.schema.d.ts.map