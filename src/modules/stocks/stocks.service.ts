import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItem, StockItemDocument } from './schemas/stock.schema';

@Injectable()
export class StocksService {
  constructor(@InjectModel(StockItem.name) private model: Model<StockItemDocument>) {}

  async create(input: Partial<StockItem>) {
    if (!input.name || !String(input.name).trim()) throw new BadRequestException('Product name is required');
    const qtyPurchased = Number(input.qtyPurchased || 0);
    const unitPrice = Number(input.unitPrice || 0);
    const totalAmount = Number(input.totalAmount ?? qtyPurchased * unitPrice);
    const inStock = Number(input.inStock ?? qtyPurchased);
    const functioning = Number(input.functioning ?? qtyPurchased);

    const doc = new this.model({
      name: String(input.name).trim(),
      productId: input.productId || '',
      category: input.category || '',
      qtyPurchased,
      unitPrice,
      totalAmount,
      inStock,
      functioning,
      supplier: input.supplier || '',
      imageName: input.imageName || '',
      imageUrl: input.imageUrl || '',
      status: input.status || this.deriveStatus(inStock),
    });
    await doc.save();
    return { id: String(doc._id) } as const;
  }

  async list({ q, page = 1, limit = 20, view }: { q?: string; page?: number; limit?: number; view?: 'stocks' | 'inventory' }) {
    const filter: any = {};
    if (q && q.trim()) {
      const rx = new RegExp(q.trim(), 'i');
      filter.$or = [{ name: rx }, { category: rx }, { supplier: rx }, { productId: rx }];
    }
    const skip = (page - 1) * limit;
    const sort: any = view === 'inventory' ? { functioning: -1, createdAt: -1 } : { inStock: -1, createdAt: -1 };
    const [items, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter),
    ]);
    return {
      items: items.map((x: any) => ({
        id: String(x._id),
        name: x.name,
        productId: x.productId,
        category: x.category,
        qtyPurchased: x.qtyPurchased,
        unitPrice: x.unitPrice,
        totalAmount: x.totalAmount,
        inStock: x.inStock,
        functioning: x.functioning ?? 0,
        supplier: x.supplier,
        imageName: x.imageName,
        imageUrl: x.imageUrl,
        status: x.status,
      })),
      total,
      page,
      limit,
    };
  }

  async kpis() {
    const [categories, totalItems, lowStock, docs, suppliers] = await Promise.all([
      this.model.distinct('category').then((arr) => arr.filter(Boolean).length),
      this.model.countDocuments({}),
      this.model.countDocuments({ status: { $in: ['Low in Stock', 'Out of Stock'] } }),
      this.model.find({}).select('totalAmount').lean(),
      this.model.distinct('supplier').then((arr) => arr.filter(Boolean).length),
    ]);
    const totalCost = docs.reduce((sum: number, x: any) => sum + (Number(x.totalAmount) || 0), 0);
    return { categories, totalItems, totalCost, lowStock, totalSuppliers: suppliers } as const;
  }

  deriveStatus(inStock: number) {
    if (inStock <= 0) return 'Out of Stock';
    if (inStock < 10) return 'Low in Stock';
    return 'In stock';
  }
}
