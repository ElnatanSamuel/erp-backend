import { Model } from 'mongoose';
import { StockItem, StockItemDocument } from './schemas/stock.schema';
export declare class StocksService {
    private model;
    constructor(model: Model<StockItemDocument>);
    create(input: Partial<StockItem>): Promise<{
        readonly id: string;
    }>;
    list({ q, page, limit, view }: {
        q?: string;
        page?: number;
        limit?: number;
        view?: 'stocks' | 'inventory';
    }): Promise<{
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
    deriveStatus(inStock: number): "In stock" | "Low in Stock" | "Out of Stock";
}
//# sourceMappingURL=stocks.service.d.ts.map