import { Model } from 'mongoose';
import { Circular, CircularDocument } from './schemas/circular.schema';
export declare class CircularsService {
    private model;
    constructor(model: Model<CircularDocument>);
    create(input: Partial<Circular>): Promise<{
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
//# sourceMappingURL=circulars.service.d.ts.map