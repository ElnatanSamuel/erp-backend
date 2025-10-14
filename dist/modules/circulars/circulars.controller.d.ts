import { CircularsService } from './circulars.service';
export declare class CircularsController {
    private readonly svc;
    constructor(svc: CircularsService);
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
            type: string | undefined;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    get(id: string): Promise<any>;
    delete(id: string): Promise<{
        readonly ok: true;
    }>;
}
//# sourceMappingURL=circulars.controller.d.ts.map