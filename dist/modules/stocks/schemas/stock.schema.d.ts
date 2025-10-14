import { HydratedDocument } from 'mongoose';
export declare class StockItem {
    name: string;
    productId?: string;
    category?: string;
    qtyPurchased?: number;
    unitPrice?: number;
    totalAmount?: number;
    inStock?: number;
    functioning?: number;
    supplier?: string;
    imageName?: string;
    imageUrl?: string;
    status?: 'In stock' | 'Low in Stock' | 'Out of Stock' | string;
}
export type StockItemDocument = HydratedDocument<StockItem>;
export declare const StockItemSchema: import("mongoose").Schema<StockItem, import("mongoose").Model<StockItem, any, any, any, import("mongoose").Document<unknown, any, StockItem, any, {}> & StockItem & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StockItem, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StockItem>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<StockItem> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=stock.schema.d.ts.map