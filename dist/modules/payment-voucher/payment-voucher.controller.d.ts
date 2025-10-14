import { PaymentVoucherService } from './payment-voucher.service';
export declare class PaymentVoucherController {
    private readonly svc;
    constructor(svc: PaymentVoucherService);
    create(body: any): Promise<{
        id: string;
    }>;
    list(q?: string, pageRaw?: string, limitRaw?: string): Promise<{
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
    count(): Promise<{
        total: number;
    }>;
    get(id: string): Promise<any>;
    update(id: string, body: any): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=payment-voucher.controller.d.ts.map