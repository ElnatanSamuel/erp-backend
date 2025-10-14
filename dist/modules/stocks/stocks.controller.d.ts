import { StocksService } from './stocks.service';
import type { Response } from 'express';
export declare class StocksController {
    private readonly svc;
    constructor(svc: StocksService);
    create(body: any): Promise<{
        readonly id: string;
    }>;
    list(q?: string, pageRaw?: string, limitRaw?: string, view?: 'stocks' | 'inventory'): Promise<{
        items: {
            id: string;
            name: any;
            productId: any;
            category: any;
            qtyPurchased: any;
            unitPrice: any;
            totalAmount: any;
            inStock: any;
            functioning: any;
            supplier: any;
            imageName: any;
            imageUrl: any;
            status: any;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    kpis(): Promise<{
        readonly categories: number;
        readonly totalItems: number;
        readonly totalCost: number;
        readonly lowStock: number;
        readonly totalSuppliers: number;
    }>;
    upload(file: any): Promise<{
        name: any;
        url: string;
    }>;
    serveImage(filename: string, res: Response): Promise<void>;
}
//# sourceMappingURL=stocks.controller.d.ts.map