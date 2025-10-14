"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const stock_schema_1 = require("./schemas/stock.schema");
let StocksService = class StocksService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        if (!input.name || !String(input.name).trim())
            throw new common_1.BadRequestException('Product name is required');
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
        return { id: String(doc._id) };
    }
    async list({ q, page = 1, limit = 20, view }) {
        const filter = {};
        if (q && q.trim()) {
            const rx = new RegExp(q.trim(), 'i');
            filter.$or = [{ name: rx }, { category: rx }, { supplier: rx }, { productId: rx }];
        }
        const skip = (page - 1) * limit;
        const sort = view === 'inventory' ? { functioning: -1, createdAt: -1 } : { inStock: -1, createdAt: -1 };
        const [items, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter),
        ]);
        return {
            items: items.map((x) => ({
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
        const totalCost = docs.reduce((sum, x) => sum + (Number(x.totalAmount) || 0), 0);
        return { categories, totalItems, totalCost, lowStock, totalSuppliers: suppliers };
    }
    deriveStatus(inStock) {
        if (inStock <= 0)
            return 'Out of Stock';
        if (inStock < 10)
            return 'Low in Stock';
        return 'In stock';
    }
};
exports.StocksService = StocksService;
exports.StocksService = StocksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(stock_schema_1.StockItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StocksService);
//# sourceMappingURL=stocks.service.js.map