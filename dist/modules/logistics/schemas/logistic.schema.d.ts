import { HydratedDocument } from 'mongoose';
export declare class Logistic {
    title: string;
    purpose?: string;
    amount?: number;
    requestedBy?: string;
    sentTo?: string;
    date: Date;
    status?: string;
    dateFrom?: Date;
    dateTo?: Date;
    voucherName?: string;
    voucherUrl?: string;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    verifierSignature?: string;
    authorizerSignature?: string;
    remarks?: string;
}
export type LogisticDocument = HydratedDocument<Logistic>;
export declare const LogisticSchema: import("mongoose").Schema<Logistic, import("mongoose").Model<Logistic, any, any, any, import("mongoose").Document<unknown, any, Logistic, any, {}> & Logistic & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Logistic, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Logistic>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Logistic> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=logistic.schema.d.ts.map