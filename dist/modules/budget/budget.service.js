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
exports.BudgetService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const budget_schema_1 = require("./schemas/budget.schema");
let BudgetService = class BudgetService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(input) {
        const doc = new this.model({
            budgetNo: input.budgetNo,
            description: input.description,
            amountUsd: Number(input.amountUsd),
            date: new Date(input.date),
            receivingOffice: input.receivingOffice,
            status: 'draft',
        });
        await doc.save();
        return { id: String(doc._id) };
    }
    async list({ page = 1, limit = 50, status }) {
        const skip = (page - 1) * limit;
        const filter = {};
        if (status)
            filter.status = status;
        const [items, total] = await Promise.all([
            this.model.find(filter).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
            this.model.countDocuments(filter).exec(),
        ]);
        return {
            items: items.map((x) => ({
                id: String(x._id),
                budgetNo: x.budgetNo,
                description: x.description,
                amountUsd: x.amountUsd,
                date: x.date,
                receivingOffice: x.receivingOffice ?? null,
                status: x.status,
            })),
            total,
            page,
            limit,
        };
    }
    async submit(id) {
        await this.model.findByIdAndUpdate(id, { $set: { status: 'submitted' } }).exec();
        return { ok: true };
    }
};
exports.BudgetService = BudgetService;
exports.BudgetService = BudgetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(budget_schema_1.BudgetEntry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BudgetService);
//# sourceMappingURL=budget.service.js.map