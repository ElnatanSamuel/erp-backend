import { HydratedDocument } from 'mongoose';
export declare class PaymentVoucherItem {
    sn: string;
    class: string;
    description: string;
    qty: number;
    unitPrice: number;
    amount: number;
    vatPercent: number;
    vatAmount: number;
    grossAmount: number;
    whtPercent?: number;
    whtAmount?: number;
    netAmount: number;
}
export declare class PaymentVoucher {
    subject: string;
    date: Date;
    preparedBy?: string;
    sendTo?: string;
    items: PaymentVoucherItem[];
    totalUnitPrice: number;
    totalAmount: number;
    totalVatAmount: number;
    totalWhtAmount: number;
    totalNetAmount: number;
    netAmountInWords?: string;
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    status?: string;
}
export type PaymentVoucherDocument = HydratedDocument<PaymentVoucher>;
export declare const PaymentVoucherSchema: import("mongoose").Schema<PaymentVoucher, import("mongoose").Model<PaymentVoucher, any, any, any, import("mongoose").Document<unknown, any, PaymentVoucher, any, {}> & PaymentVoucher & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PaymentVoucher, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PaymentVoucher>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PaymentVoucher> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=payment-voucher.schema.d.ts.map