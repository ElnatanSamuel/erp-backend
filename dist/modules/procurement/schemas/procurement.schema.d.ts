import { HydratedDocument } from 'mongoose';
export declare class Procurement {
    itemName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    requestedBy?: string;
    sentTo?: string;
    date: Date;
    status?: string;
    addAttachment?: string;
    attachmentType?: string;
    hasAttachment?: string;
    vatPercent?: number;
    vatAmount?: number;
    grossAmount?: number;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    initiatedBy?: string;
    verifiedBy?: string;
    approvedBy?: string;
    verifierSignature?: string;
    authorizerSignature?: string;
}
export type ProcurementDocument = HydratedDocument<Procurement>;
export declare const ProcurementSchema: import("mongoose").Schema<Procurement, import("mongoose").Model<Procurement, any, any, any, import("mongoose").Document<unknown, any, Procurement, any, {}> & Procurement & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Procurement, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Procurement>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Procurement> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=procurement.schema.d.ts.map