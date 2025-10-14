import { Model } from 'mongoose';
import { Memo, MemoDocument } from './schemas/memo.schema';
export declare class MemosService {
    private model;
    constructor(model: Model<MemoDocument>);
    create(input: Partial<Memo>): Promise<{
        id: string;
    }>;
    list({ q, type, page, limit }: {
        q?: string;
        type?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            title: string;
            sentFrom: string | undefined;
            sentTo: string | undefined;
            date: Date;
            hasAttachment: boolean;
            type: string;
            action: string;
            attachmentType: string;
            cc: string[];
            attachmentName: string;
            attachmentUrl: string;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    kpis(): Promise<{
        total: number;
    }>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=memos.service.d.ts.map