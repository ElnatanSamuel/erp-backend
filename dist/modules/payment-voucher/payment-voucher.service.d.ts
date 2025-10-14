import { Model } from 'mongoose';
import { PaymentVoucher, PaymentVoucherDocument } from './schemas/payment-voucher.schema';
export declare class PaymentVoucherService {
    private model;
    constructor(model: Model<PaymentVoucherDocument>);
    create(input: Partial<PaymentVoucher>): Promise<{
        id: string;
    }>;
    list({ q, page, limit }: {
        q?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            subject: string;
            date: Date;
            preparedBy: string | undefined;
            sendTo: string | undefined;
            status: string | undefined;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    get(id: string): Promise<any>;
    update(id: string, input: Partial<PaymentVoucher>): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
    count(): Promise<number>;
}
//# sourceMappingURL=payment-voucher.service.d.ts.map