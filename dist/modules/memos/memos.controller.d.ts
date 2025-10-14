import { MemosService } from './memos.service';
import type { Response } from 'express';
export declare class MemosController {
    private readonly svc;
    constructor(svc: MemosService);
    create(body: any): Promise<{
        id: string;
    }>;
    list(q?: string, type?: string, pageRaw?: string, limitRaw?: string): Promise<{
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
    upload(file: any): Promise<{
        name: any;
        url: string;
    }>;
    serveAttachment(filename: string, res: Response): Promise<void>;
}
//# sourceMappingURL=memos.controller.d.ts.map